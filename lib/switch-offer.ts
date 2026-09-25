import { residentialPlans, type Plan } from '@/lib/plans';

export interface SwitchEligiblePlan {
  /** Plan id from lib/plans.ts residentialPlans. Regular price comes from there. */
  planId: string;
  /** Monthly switcher price for the first `promoMonths` months. */
  promoPrice: number;
}

export const SWITCH_OFFER = {
  // Plans the switcher price applies to. Regular price comes from lib/plans.ts.
  // To open other tiers later, add entries like { planId: 'res-1g', promoPrice: 55 }.
  // One plan: no picker. More than one: a plan picker shows above the form.
  eligiblePlans: [{ planId: 'res-500', promoPrice: 35 }] as SwitchEligiblePlan[],
  promoMonths: 6,
  lockYears: 3,
  eligibleStates: ['WV'], // Valley only. Danville is not part of this offer.
  phone: { display: '(304) 744-4034', tel: '+13047444034' }, // will become a tracking number
  cognitoFormNumber: '60', // "Switch Sign Up" (copy of form 22)
  conversionSendTo: 'AW-18360544898/mTprCMSXidkcEILd_rJE',
  callbackPromise: 'We\'ll call you soon, usually the same business day.',
  // When Harrison's instant CSR text is live, change to:
  // 'A real person will call you within 15 minutes during business hours.'
  landingPage: '/switch',
  thankYouPath: '/switch/thank-you',
  waitlistSource: 'switch-waitlist',
};

/**
 * Internal field names on the Cognito switch form. Hidden field names match
 * their labels (confirmed on form 60, 9/25).
 *
 * serviceAddress is a Cognito Address-type field, prefilled as an object
 * using the part names below. Set it to '' to skip the address prefill.
 */
export const SWITCH_COGNITO_FIELDS = {
  source: 'Source',
  from: 'From',
  utm_source: 'UTMSource',
  utm_medium: 'UTMMedium',
  utm_campaign: 'UTMCampaign',
  utm_content: 'UTMContent',
  gclid: 'GCLID',
  fbclid: 'FBCLID',
  plan: 'Plan',
  landingPage: 'LandingPage',
  addressVerified: 'AddressVerified',
  serviceAddress: 'Address',
  howHeard: 'HowDidYouHearAboutUs',
} as const;

/**
 * Prefills "How did you hear about us?" from the `src` URL param, so ad and
 * print visitors don't have to answer it. Values must match the Cognito
 * choice labels exactly. `sign` and `referral` also make "Who referred you?"
 * show, through the form's own rule. Unlisted src values leave it blank.
 */
export const SWITCH_HOW_HEARD_BY_SOURCE: Record<string, string> = {
  fb: 'Facebook/Instagram',
  google: 'Google',
  mail1: 'Postcard',
  mail2: 'Postcard',
  hanger: 'Door Hanger',
  sign: 'Yard Sign',
  email: 'Email',
  referral: 'Referral',
};

export const SWITCH_COGNITO_ADDRESS_PARTS = {
  line1: 'Line1',
  line2: 'Line2',
  city: 'City',
  state: 'State',
  zip: 'PostalCode',
  // 'abbr' sends "WV", 'name' sends "West Virginia". Form 60 uses full names.
  stateFormat: 'name' as 'abbr' | 'name',
};

/**
 * What each `src` value means. Used for reference and reporting; any src
 * value is still passed through to Cognito as-is.
 */
export const SWITCH_SOURCES: Record<string, string> = {
  fb: 'Facebook / Instagram ads',
  google: 'Google Search ads',
  mail1: 'EDDM postcard drop 1',
  mail2: 'EDDM postcard drop 2',
  hanger: 'Door hanger',
  sign: 'Yard sign',
  email: 'SecureNet customer email',
  'obj-optimum': 'Competitor-objection mailer (Optimum)',
  'obj-frontier': 'Competitor-objection mailer (Frontier)',
  'obj-tmobile': 'Competitor-objection mailer (T-Mobile)',
  referral: 'Referral',
};

export interface SwitchPlan {
  planId: string;
  plan: Plan;
  promoPrice: number;
  regularPrice: number;
  /** e.g. "500 Mbps" */
  speedLabel: string;
}

/** Eligible plans joined with lib/plans.ts, in config order. Unknown ids are skipped. */
export function getSwitchPlans(): SwitchPlan[] {
  return SWITCH_OFFER.eligiblePlans.flatMap((entry) => {
    const plan = residentialPlans.find((p) => p.id === entry.planId);
    if (!plan) return [];
    return [{
      planId: plan.id,
      plan,
      promoPrice: entry.promoPrice,
      regularPrice: plan.price,
      speedLabel: plan.name,
    }];
  });
}

/** Value sent to the Cognito "Plan" hidden field. */
export function switchPlanLabel(p: SwitchPlan): string {
  return `${p.speedLabel} (${p.plan.brandName ?? p.plan.name}), switcher $${p.promoPrice}/mo for ${SWITCH_OFFER.promoMonths} months then $${p.regularPrice}/mo`;
}
