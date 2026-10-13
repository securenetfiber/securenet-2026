'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import CognitoEmbed, { type CognitoEvent } from '@/components/CognitoEmbed';
import FaqAccordion from '@/components/FaqAccordion';
import SameFiberAddressCheck, {
  SAME_FIBER_ADDRESS_INPUT_ID,
  SAME_FIBER_CHECK_ID,
  type SameFiberAddress,
} from '@/components/samefiber/SameFiberAddressCheck';
import SameFiberComparison from '@/components/samefiber/SameFiberComparison';
import {
  SAME_FIBER,
  SAME_FIBER_FIELDS,
  SAME_FIBER_ADDRESS_PARTS,
  SAME_FIBER_STATE_NAMES,
  SAME_FIBER_SOURCES,
  SAME_FIBER_ATTR_KEYS,
  captureSameFiberAttribution,
  getSameFiberPlans,
  sameFiberFormReady,
  sameFiberConversionReady,
  type SameFiberAttribution,
  type SameFiberPlan,
} from '@/lib/samefiber';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';
import { ADDRESS_CHECK } from '@/lib/address-check';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface SignupState {
  verified: boolean;
  address: SameFiberAddress | null;
  raw: string;
  /** Bumped on every reveal so the form remounts with fresh prefill. */
  seq: number;
}

const SIGNUP_ID = 'sf-signup';

// Attribution URL param -> Cognito field key in SAME_FIBER_FIELDS
const ATTR_TO_FIELD: Record<(typeof SAME_FIBER_ATTR_KEYS)[number], keyof typeof SAME_FIBER_FIELDS> = {
  src: 'source',
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_campaign: 'utm_campaign',
  utm_content: 'utm_content',
  gclid: 'gclid',
  fbclid: 'fbclid',
};

// One conversion per page load, no matter how many times Cognito fires or
// React remounts the form.
let conversionStarted = false;

function handleAfterSubmit(event: CognitoEvent) {
  if (conversionStarted) return;
  conversionStarted = true;

  const entry = event?.data?.entry;
  const entryId = entry?.Id ?? entry?.Entry?.Number ?? entry?.Number;
  const transactionId = entryId
    ? `samefiber-${SAME_FIBER.cognitoFormNumber}-${entryId}`
    : `samefiber-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  let navigated = false;
  const goToThankYou = () => {
    if (navigated) return;
    navigated = true;
    window.location.assign(SAME_FIBER.thankYouPath);
  };

  // If gtag is blocked or slow, don't strand the customer on the form.
  window.setTimeout(goToThankYou, 1500);

  if (!sameFiberConversionReady) return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: SAME_FIBER.conversionSendTo,
        value: 1.0,
        currency: 'USD',
        transaction_id: transactionId,
        event_callback: goToThankYou,
      });
    }
  } catch {
    // Fall through to the timeout
  }
}

function buildPrefill(
  signup: SignupState,
  plan: SameFiberPlan | null,
  attribution: SameFiberAttribution,
): Record<string, unknown> {
  const f = SAME_FIBER_FIELDS;
  const data: Record<string, unknown> = {};

  for (const key of SAME_FIBER_ATTR_KEYS) {
    const value = attribution[key];
    if (value) data[f[ATTR_TO_FIELD[key]]] = value;
  }
  const howHeard = attribution.src ? SAME_FIBER_SOURCES[attribution.src]?.howHeard : undefined;
  if (howHeard) data[f.howHeard] = howHeard;
  if (plan) data[f.plan] = plan.formValue;
  data[f.landingPage] = SAME_FIBER.landingPage;
  data[f.addressVerified] = signup.verified ? 'yes' : 'no';

  const parts = SAME_FIBER_ADDRESS_PARTS;
  if (signup.verified && signup.address) {
    const a = signup.address;
    const address: Record<string, string> = {
      [parts.line1]: a.line1,
      [parts.city]: a.city,
      [parts.state]: SAME_FIBER_STATE_NAMES[a.state] ?? a.state,
      [parts.zip]: a.zip,
    };
    if (a.line2) address[parts.line2] = a.line2;
    data[f.serviceAddress] = address;
  } else if (signup.raw) {
    data[f.serviceAddress] = { [parts.line1]: signup.raw };
  }

  return data;
}

function scrollToChecker() {
  document.getElementById(SAME_FIBER_CHECK_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const input = document.getElementById(SAME_FIBER_ADDRESS_INPUT_ID) as HTMLInputElement | null;
  input?.focus({ preventScroll: true });
}

function scrollToSignup() {
  requestAnimationFrame(() => {
    document.getElementById(SIGNUP_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

const CHECK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default function SameFiberLanding() {
  const plans = useMemo(() => getSameFiberPlans(), []);
  const [planId, setPlanId] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<SameFiberAttribution>({});
  const [signup, setSignup] = useState<SignupState | null>(null);

  const plan = plans.find((p) => p.planId === planId) ?? null;
  const hero = SAME_FIBER_COPY.hero[SAME_FIBER.mode];
  const s = SAME_FIBER_COPY.signup;

  useEffect(() => {
    setAttribution(captureSameFiberAttribution(window.location.search));
  }, []);

  // Bring the form into view whenever it's revealed
  useEffect(() => {
    if (signup) scrollToSignup();
  }, [signup?.seq]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVerified = useCallback((address: SameFiberAddress) => {
    setSignup((prev) => ({ verified: true, address, raw: address.address, seq: (prev?.seq ?? 0) + 1 }));
  }, []);

  const handleSignUpAnyway = useCallback((raw: string) => {
    setSignup((prev) => ({ verified: false, address: null, raw, seq: (prev?.seq ?? 0) + 1 }));
  }, []);

  const handleReset = useCallback(() => setSignup(null), []);

  // "Choose" sets the plan, then goes to the form if it's open, or the checker if not
  const handleChoose = useCallback((p: SameFiberPlan) => {
    setPlanId(p.planId);
    if (signup) scrollToSignup();
    else scrollToChecker();
  }, [signup]);

  const prefill = signup ? buildPrefill(signup, plan, attribution) : null;

  let intro = '';
  if (signup) {
    if (signup.verified && signup.address) intro = s.serviceableIntro(signup.address.address);
    else intro = ADDRESS_CHECK.enabled ? s.signUpAnywayIntro : s.uncheckedIntro;
  }

  return (
    <>
      {/* HERO + ADDRESS CHECK */}
      <section className="page-hero sf-hero">
        <div className="section-container sf-hero-grid">
          <div className="sf-hero-copy">
            <p className="sf-kicker">{hero.kicker}</p>
            <h1 className="section-heading">{hero.headline}</h1>
            <p className="section-sub">{hero.subhead}</p>
            <ul className="sf-proof" role="list">
              {hero.proofPoints.map((point) => (
                <li key={point}>
                  {CHECK_ICON}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <SameFiberAddressCheck
            onVerified={handleVerified}
            onSignUpAnyway={handleSignUpAnyway}
            onReset={handleReset}
          />
        </div>
      </section>

      {/* SIGNUP FORM (revealed after the address check) */}
      {signup && prefill && (
        <section className="signup-section sf-signup" id={SIGNUP_ID}>
          <div className="section-container signup-container signup-container--form">
            <div className="signup-form-area">
              {sameFiberFormReady ? (
                <>
                  <p className="sf-signup-sub">{intro}</p>
                  <CognitoEmbed
                    key={`${signup.seq}-${plan?.planId ?? 'none'}`}
                    formNumber={SAME_FIBER.cognitoFormNumber}
                    prefill={prefill}
                    onAfterSubmit={handleAfterSubmit}
                  />
                </>
              ) : (
                <div className="sf-form-fallback">
                  <h2 className="sf-section-heading">{s.fallbackHeading}</h2>
                  <p className="sf-signup-sub">{s.fallbackBody}</p>
                  <a href={`tel:${SAME_FIBER.phone.tel}`} className="btn btn-primary">
                    {SAME_FIBER.phone.display}
                  </a>
                </div>
              )}
            </div>
            {sameFiberFormReady && (
              <div className="signup-sidebar">
                <div className="signup-card">
                  <h3>{s.callHeading}</h3>
                  <div className="signup-phones">
                    <div className="signup-phone">
                      <a href={`tel:${SAME_FIBER.phone.tel}`}>{SAME_FIBER.phone.display}</a>
                    </div>
                  </div>
                  <p className="signup-hours">{s.callHours}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PRICE COMPARISON (hidden when SAME_FIBER.competitor is null) */}
      <SameFiberComparison plans={plans} onChoose={handleChoose} />

      {/* HOW SWITCHING WORKS */}
      <section className="ts-section ts-section--alt sf-how">
        <div className="section-container ts-container">
          <h2 className="section-heading">{SAME_FIBER_COPY.how.heading}</h2>
          <div className="ts-steps">
            {SAME_FIBER_COPY.how.steps.map((step, i) => (
              <div className="ts-step" key={step.title}>
                <div className="ts-step-number">{i + 1}</div>
                <div className="ts-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section sf-faq">
        <div className="section-container sf-faq-container">
          <h2 className="section-heading">{SAME_FIBER_COPY.faq.heading}</h2>
          <FaqAccordion items={SAME_FIBER_COPY.faq.items(SAME_FIBER.mode, SAME_FIBER.utilityFee)} />
        </div>
      </section>

      {/* BACK TO THE CHECKER */}
      <section className="availability sf-bottom-cta">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">{SAME_FIBER_COPY.bottomCta.heading}</h2>
            <button type="button" className="btn btn-primary" onClick={scrollToChecker}>
              {SAME_FIBER_COPY.bottomCta.button}
            </button>
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section className="sf-fine-print">
        <div className="section-container">
          <p>
            {SAME_FIBER_COPY.finePrint({
              competitorName: SAME_FIBER.competitor?.name ?? null,
              checkedOn: SAME_FIBER.competitor?.checkedOn ?? null,
              utilityFee: SAME_FIBER.utilityFee,
              lockYears: SAME_FIBER.lockYears,
            })}
          </p>
        </div>
      </section>
    </>
  );
}
