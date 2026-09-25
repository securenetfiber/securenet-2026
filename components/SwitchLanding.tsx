'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import CognitoEmbed, { type CognitoEvent } from '@/components/CognitoEmbed';
import SwitchAddressCheck, {
  SWITCH_ADDRESS_INPUT_ID,
  type VerifiedAddress,
} from '@/components/SwitchAddressCheck';
import TestimonialStrip from '@/components/TestimonialStrip';
import FaqAccordion from '@/components/FaqAccordion';
import {
  SWITCH_OFFER,
  SWITCH_COGNITO_FIELDS,
  SWITCH_COGNITO_ADDRESS_PARTS,
  getSwitchPlans,
  switchPlanLabel,
  type SwitchPlan,
} from '@/lib/switch-offer';
import { SWITCH_COPY, type SwitchPriceVars } from '@/lib/switch-copy';
import {
  captureSwitchAttribution,
  SWITCH_ATTR_KEYS,
  type SwitchAttribution,
} from '@/lib/switch-attribution';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface SignupState {
  verified: boolean;
  address: VerifiedAddress | null;
  raw: string;
  /** Bumped on every reveal so the form remounts with fresh prefill. */
  seq: number;
}

const STATE_NAMES: Record<string, string> = {
  WV: 'West Virginia',
  VA: 'Virginia',
};

// Attribution URL param -> Cognito field key in SWITCH_COGNITO_FIELDS
const ATTR_TO_FIELD: Record<(typeof SWITCH_ATTR_KEYS)[number], keyof typeof SWITCH_COGNITO_FIELDS> = {
  src: 'source',
  from: 'from',
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
    ? `switch-${SWITCH_OFFER.cognitoFormNumber}-${entryId}`
    : `switch-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  let navigated = false;
  const goToThankYou = () => {
    if (navigated) return;
    navigated = true;
    window.location.assign(SWITCH_OFFER.thankYouPath);
  };

  // If gtag is blocked or slow, don't strand the customer on the form.
  window.setTimeout(goToThankYou, 1500);

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: SWITCH_OFFER.conversionSendTo,
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

function priceVars(p: SwitchPlan): SwitchPriceVars {
  return {
    promo: p.promoPrice,
    regular: p.regularPrice,
    months: SWITCH_OFFER.promoMonths,
    years: SWITCH_OFFER.lockYears,
    speed: p.speedLabel,
  };
}

function buildPrefill(
  signup: SignupState,
  plan: SwitchPlan,
  attribution: SwitchAttribution,
): Record<string, unknown> {
  const f = SWITCH_COGNITO_FIELDS;
  const data: Record<string, unknown> = {};

  for (const key of SWITCH_ATTR_KEYS) {
    const value = attribution[key];
    if (value) data[f[ATTR_TO_FIELD[key]]] = value;
  }
  data[f.plan] = switchPlanLabel(plan);
  data[f.landingPage] = SWITCH_OFFER.landingPage;
  data[f.addressVerified] = signup.verified ? 'yes' : 'no';

  if (f.serviceAddress) {
    const parts = SWITCH_COGNITO_ADDRESS_PARTS;
    if (signup.verified && signup.address) {
      const a = signup.address;
      const state = parts.stateFormat === 'name' ? (STATE_NAMES[a.state] ?? a.state) : a.state;
      const address: Record<string, string> = {
        [parts.line1]: a.line1,
        [parts.city]: a.city,
        [parts.state]: state,
        [parts.zip]: a.zip,
      };
      if (a.line2) address[parts.line2] = a.line2;
      data[f.serviceAddress] = address;
    } else if (signup.raw) {
      data[f.serviceAddress] = { [parts.line1]: signup.raw };
    }
  }

  return data;
}

function scrollToChecker() {
  document.getElementById('switch-check')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const input = document.getElementById(SWITCH_ADDRESS_INPUT_ID) as HTMLInputElement | null;
  input?.focus({ preventScroll: true });
}

const ICONS = [
  // Price tag
  <svg key="price" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  // Lightning
  <svg key="speed" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  // Phone
  <svg key="local" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
];

export default function SwitchLanding({ from }: { from?: string }) {
  const plans = useMemo(() => getSwitchPlans(), []);
  const [planId, setPlanId] = useState(plans[0]?.planId ?? '');
  const [attribution, setAttribution] = useState<SwitchAttribution>({});
  const [signup, setSignup] = useState<SignupState | null>(null);

  const plan = plans.find((p) => p.planId === planId) ?? plans[0];
  const vars = priceVars(plan);
  // The hero always advertises the cheapest eligible plan, whatever is picked below
  const heroPlan = plans.reduce((low, p) => (p.promoPrice < low.promoPrice ? p : low), plans[0]);
  const heroVars = priceVars(heroPlan);
  const lowestPromo = heroPlan.promoPrice;
  const fromKey = (from ?? attribution.from ?? '').toLowerCase();
  const headlineFn = SWITCH_COPY.headlineByFrom[fromKey] ?? SWITCH_COPY.hero.headline;

  useEffect(() => {
    setAttribution(captureSwitchAttribution(window.location.search));
  }, []);

  // Bring the form into view whenever it's revealed
  useEffect(() => {
    if (!signup) return;
    requestAnimationFrame(() => {
      document.getElementById('switch-signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [signup?.seq]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVerified = useCallback((address: VerifiedAddress) => {
    setSignup((prev) => ({ verified: true, address, raw: address.address, seq: (prev?.seq ?? 0) + 1 }));
  }, []);

  const handleSignUpAnyway = useCallback((raw: string) => {
    setSignup((prev) => ({ verified: false, address: null, raw, seq: (prev?.seq ?? 0) + 1 }));
  }, []);

  const handleReset = useCallback(() => setSignup(null), []);

  const attributionForWaitlist = useMemo(() => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(attribution)) if (v) out[k] = v;
    return out;
  }, [attribution]);

  const prefill = signup ? buildPrefill(signup, plan, attribution) : null;
  const offerPlans = plans.map((p) => ({ promo: p.promoPrice, regular: p.regularPrice, speed: p.speedLabel }));

  return (
    <>
      {/* HERO + ADDRESS CHECK */}
      <section className="page-hero switch-hero">
        <div className="section-container switch-hero-grid">
          <div className="switch-hero-copy">
            <h1 className="section-heading">{headlineFn(lowestPromo)}</h1>
            <p className="section-sub">{SWITCH_COPY.hero.subhead(heroVars)}</p>
            <ul className="switch-proof" role="list">
              {SWITCH_COPY.hero.proofPoints(heroVars).map((point) => (
                <li key={point}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <SwitchAddressCheck
            onVerified={handleVerified}
            onSignUpAnyway={handleSignUpAnyway}
            onReset={handleReset}
            attribution={attributionForWaitlist}
          />
        </div>
      </section>

      {/* SIGNUP FORM (revealed after the address check) */}
      {signup && prefill && (
        <section className="signup-section switch-signup" id="switch-signup">
          <div className="section-container signup-container signup-container--form">
            <div className="signup-form-area">
              <h2 className="switch-section-heading">{SWITCH_COPY.signup.heading}</h2>
              <p className="switch-signup-sub">
                {signup.verified ? SWITCH_COPY.signup.sub : SWITCH_COPY.signup.unverifiedSub}
              </p>

              {plans.length > 1 && (
                <div className="switch-plan-picker">
                  <h3 className="switch-plan-picker-heading">{SWITCH_COPY.signup.pickerHeading}</h3>
                  <div className="switch-plan-grid" role="radiogroup" aria-label={SWITCH_COPY.signup.pickerHeading}>
                    {plans.map((p) => {
                      const selected = p.planId === plan.planId;
                      const v = { promo: p.promoPrice, regular: p.regularPrice, speed: p.speedLabel };
                      return (
                        <button
                          key={p.planId}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          className={`plan-card switch-plan-option${selected ? ' plan-card--featured switch-plan-option--selected' : ''}`}
                          onClick={() => setPlanId(p.planId)}
                        >
                          <span className="plan-name">{p.plan.brandName}</span>
                          <span className="switch-plan-speed">{p.speedLabel}</span>
                          <span className="switch-plan-promo">{SWITCH_COPY.signup.pickerPromo(v, SWITCH_OFFER.promoMonths)}</span>
                          <span className="switch-plan-regular">{SWITCH_COPY.signup.pickerRegular(v, SWITCH_OFFER.lockYears)}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="switch-plan-note">{SWITCH_COPY.signup.pickerChangeNote}</p>
                </div>
              )}

              <CognitoEmbed
                key={`${signup.seq}-${plan.planId}`}
                formNumber={SWITCH_OFFER.cognitoFormNumber}
                prefill={prefill}
                onAfterSubmit={handleAfterSubmit}
              />
            </div>
            <div className="signup-sidebar">
              <div className="signup-card">
                <h3>{SWITCH_COPY.signup.priceHeading}</h3>
                <p className="switch-price-line">{SWITCH_COPY.signup.pickerPromo(vars, SWITCH_OFFER.promoMonths)}</p>
                <p>{SWITCH_COPY.signup.pickerRegular(vars, SWITCH_OFFER.lockYears)}</p>
              </div>
              <div className="signup-card">
                <h3>{SWITCH_COPY.signup.callHeading}</h3>
                <div className="signup-phones">
                  <div className="signup-phone">
                    <a href={`tel:${SWITCH_OFFER.phone.tel}`}>{SWITCH_OFFER.phone.display}</a>
                  </div>
                </div>
                <p className="signup-hours">{SWITCH_COPY.signup.callHours}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY SWITCH */}
      <section className="why-fiber switch-why">
        <div className="section-container">
          <h2 className="section-heading">{SWITCH_COPY.why.heading}</h2>
          <div className="benefit-grid switch-benefit-grid">
            {SWITCH_COPY.why.items(vars).map((item, i) => (
              <div className="benefit-card" key={item.title}>
                <div className="benefit-icon">{ICONS[i % ICONS.length]}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW SWITCHING WORKS */}
      <section className="ts-section ts-section--alt switch-how">
        <div className="section-container ts-container">
          <h2 className="section-heading">{SWITCH_COPY.how.heading}</h2>
          <div className="ts-steps">
            {SWITCH_COPY.how.steps.map((step, i) => (
              <div className="ts-step" key={step.title}>
                <div className="ts-step-number">{i + 1}</div>
                <div className="ts-step-content">
                  <h3>{step.title}</h3>
                  {step.body && <p>{step.body}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="switch-reviews">
        <div className="section-container">
          <h2 className="section-heading">{SWITCH_COPY.reviews.heading}</h2>
        </div>
      </section>
      <TestimonialStrip />

      {/* FAQ */}
      <section className="faq-section switch-faq">
        <div className="section-container switch-faq-container">
          <h2 className="section-heading">{SWITCH_COPY.faq.heading}</h2>
          <FaqAccordion items={SWITCH_COPY.faq.items(vars)} />
        </div>
      </section>

      {/* BACK TO THE CHECKER */}
      <section className="availability switch-bottom-cta">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">{SWITCH_COPY.bottomCta.heading}</h2>
            <p className="avail-sub">{SWITCH_COPY.bottomCta.sub}</p>
            <button type="button" className="btn btn-primary" onClick={scrollToChecker}>
              {SWITCH_COPY.bottomCta.button}
            </button>
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section className="switch-fine-print">
        <div className="section-container">
          <p>{SWITCH_COPY.finePrint(offerPlans, SWITCH_OFFER.promoMonths, SWITCH_OFFER.lockYears)}</p>
        </div>
      </section>
    </>
  );
}
