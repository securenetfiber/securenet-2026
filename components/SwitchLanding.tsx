'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CognitoEmbed, { type CognitoEvent } from '@/components/CognitoEmbed';
import TestimonialStrip from '@/components/TestimonialStrip';
import FaqAccordion from '@/components/FaqAccordion';
import {
  SWITCH_OFFER,
  SWITCH_COGNITO_FIELDS,
  SWITCH_HOW_HEARD_BY_SOURCE,
  getSwitchPlans,
  switchPlanLabel,
  type SwitchPlan,
} from '@/lib/switch-offer';
import { SWITCH_COPY, type SwitchPriceVars } from '@/lib/switch-copy';
import {
  captureSwitchAttribution,
  marketFromCampaign,
  SWITCH_ATTR_KEYS,
  type SwitchAttribution,
} from '@/lib/switch-attribution';

import { trackMeta, trackMetaCustom } from '@/lib/meta-pixel';
import { trackGa } from '@/lib/analytics';

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
    trackMeta('Lead', { content_name: 'switch_form_60' }, transactionId);
  } catch {
    // Never block the redirect
  }

  trackGa('generate_lead', { form: 'switch', transaction_id: transactionId });

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

/**
 * Hidden attribution fields for the Cognito entry. Cognito ignores keys the
 * form doesn't have, so this works whatever fields form 60 has today.
 */
function buildPrefill(plan: SwitchPlan, attribution: SwitchAttribution): Record<string, unknown> {
  const f = SWITCH_COGNITO_FIELDS;
  const data: Record<string, unknown> = {};

  for (const key of SWITCH_ATTR_KEYS) {
    const value = attribution[key];
    if (value) data[f[ATTR_TO_FIELD[key]]] = value;
  }
  const howHeard = attribution.src ? SWITCH_HOW_HEARD_BY_SOURCE[attribution.src] : undefined;
  if (howHeard) data[f.howHeard] = howHeard;
  data[f.plan] = switchPlanLabel(plan);
  data[f.landingPage] = SWITCH_OFFER.landingPage;

  return data;
}

function scrollToForm() {
  document.getElementById('switch-signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const PHONE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const CHECK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const FORM_SKELETON = (
  <div className="switch-form-skeleton" role="status" aria-label={SWITCH_COPY.form.loading}>
    <div className="switch-skel-row">
      <div className="switch-skel-field" />
      <div className="switch-skel-field" />
    </div>
    <div className="switch-skel-field" />
    <div className="switch-skel-field switch-skel-field--tall" />
    <div className="switch-skel-button" />
  </div>
);

export default function SwitchLanding({ campaign }: { campaign?: string }) {
  const plans = useMemo(() => getSwitchPlans(), []);
  const [planId, setPlanId] = useState(plans[0]?.planId ?? '');
  const [attribution, setAttribution] = useState<SwitchAttribution | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const formViewSent = useRef(false);
  const formStartSent = useRef(false);

  const plan = plans.find((p) => p.planId === planId) ?? plans[0];
  const vars = priceVars(plan);
  // The hero always advertises the cheapest eligible plan, whatever is picked below
  const heroPlan = plans.reduce((low, p) => (p.promoPrice < low.promoPrice ? p : low), plans[0]);
  const heroVars = priceVars(heroPlan);
  const headline = SWITCH_COPY.hero.headline(heroPlan.promoPrice, SWITCH_OFFER.promoMonths);
  // The URL wins so the market line renders on the server with no layout shift
  const market = marketFromCampaign(campaign ?? attribution?.utm_campaign);
  const marketLine = SWITCH_COPY.hero.marketLine[market];

  useEffect(() => {
    setAttribution(captureSwitchAttribution(window.location.search));
  }, []);

  const funnelParams = useCallback(
    () => ({ market, utm_content: attribution?.utm_content ?? '' }),
    [market, attribution],
  );

  const handleFormReady = useCallback(() => {
    if (formViewSent.current) return;
    formViewSent.current = true;
    trackGa('switch_form_view', funnelParams());
    trackMetaCustom('SwitchFormView', funnelParams());
  }, [funnelParams]);

  const handleFormStart = useCallback(() => {
    if (formStartSent.current) return;
    formStartSent.current = true;
    trackGa('switch_form_start', funnelParams());
    trackMetaCustom('SwitchFormStart', funnelParams());
  }, [funnelParams]);

  // The sticky call bar hides while anything in the form has focus
  const handleFocus = useCallback(() => {
    setFormFocused(true);
    handleFormStart();
  }, [handleFormStart]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    setFormFocused(false);
  }, []);

  // Wait for attribution so the hidden fields make the one prefill Cognito allows
  const prefill = attribution ? buildPrefill(plan, attribution) : null;
  const offerPlans = plans.map((p) => ({ promo: p.promoPrice, regular: p.regularPrice, speed: p.speedLabel }));

  return (
    <>
      {/* HERO + FORM */}
      <section className="page-hero switch-hero">
        <div className="section-container switch-hero-grid">
          <div className="switch-hero-copy">
            {marketLine && <p className="switch-market">{marketLine}</p>}
            <h1 className="section-heading">
              {headline.before}
              <span className="switch-local">{headline.highlight}</span>
              {headline.after}
            </h1>
            <p className="section-sub">{SWITCH_COPY.hero.subhead(heroVars)}</p>
            <div className="switch-hero-actions">
              <button type="button" className="btn btn-primary switch-hero-btn" onClick={scrollToForm}>
                {SWITCH_COPY.hero.signUpButton}
              </button>
              <a href={`tel:${SWITCH_OFFER.phone.tel}`} className="btn switch-hero-btn switch-hero-btn--call">
                {PHONE_ICON}
                {SWITCH_COPY.hero.callButton(SWITCH_OFFER.phone.display)}
              </a>
            </div>
          </div>

          <div className="switch-form-card" id="switch-signup">
            <p className="switch-form-intro">{SWITCH_COPY.form.intro}</p>

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

            {/* The seamless embed renders in our DOM, so these listeners see its fields */}
            <div className="switch-signup" onFocus={handleFocus} onBlur={handleBlur} onInput={handleFormStart}>
              {prefill ? (
                <CognitoEmbed
                  key={plan.planId}
                  formNumber={SWITCH_OFFER.cognitoFormNumber}
                  prefill={prefill}
                  onAfterSubmit={handleAfterSubmit}
                  onReady={handleFormReady}
                  skeleton={FORM_SKELETON}
                />
              ) : (
                FORM_SKELETON
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY SWITCH */}
      <section className="switch-why">
        <div className="section-container">
          <h2 className="section-heading">{SWITCH_COPY.why.heading}</h2>
          <ul className="switch-why-list" role="list">
            {SWITCH_COPY.hero.proofPoints.map((point) => (
              <li key={point}>
                {CHECK_ICON}
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="switch-current-customer">
            <strong>{SWITCH_COPY.currentCustomer.heading}</strong>{' '}
            {SWITCH_COPY.currentCustomer.body}{' '}
            <a href={`tel:${SWITCH_OFFER.phone.tel}`}>
              {SWITCH_COPY.currentCustomer.callLabel(SWITCH_OFFER.phone.display)}
            </a>
          </p>
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

      {/* BACK TO THE FORM */}
      <section className="availability switch-bottom-cta">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">{SWITCH_COPY.bottomCta.heading}</h2>
            <button type="button" className="btn btn-primary" onClick={scrollToForm}>
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

      {/* STICKY CALL BAR (mobile only, hidden while typing in the form) */}
      <a
        href={`tel:${SWITCH_OFFER.phone.tel}`}
        className={`switch-sticky-call${formFocused ? ' switch-sticky-call--hidden' : ''}`}
        aria-hidden={formFocused || undefined}
        tabIndex={formFocused ? -1 : undefined}
      >
        {PHONE_ICON}
        {SWITCH_COPY.stickyCall.label(SWITCH_OFFER.phone.display)}
      </a>
    </>
  );
}
