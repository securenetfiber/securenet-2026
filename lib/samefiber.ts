import { residentialPlans, type Plan } from '@/lib/plans';

/**
 * Config for the Same Fiber campaign (/danville-fiber): RiverStreet customers
 * on Danville Utilities city fiber. Regular price, no promo.
 *
 * Shares nothing with /switch. Our prices come from lib/plans.ts, so a price
 * change there updates the page, the comparison, and the savings.
 */
export const SAME_FIBER = {
  // Plans offered on the page, in display order. formValue must match the
  // Cognito "Which Plan?" choice label exactly.
  plans: [
    { planId: 'res-500', formValue: '500 Mbps' },
    { planId: 'res-1g', formValue: '1 Gig' },
  ],
  lockYears: null as number | null, // Kevin: does the 3-year lock apply in Danville? null hides all lock language.
  phone: { display: '(434) 354-0101', tel: '+14343540101' }, // may become a tracking number
  cognitoFormNumber: '62', // "Same Fiber Signup (Danville)". 'XX' shows the call-us fallback.
  conversionSendTo: 'AW-18360544898/XXXXXXXX', // "Same Fiber Signup" conversion. XX fires nothing.
  callbackPromise: 'We\'ll call you soon, usually the same business day.',
  // 'provider-exit' swaps the hero and leads the FAQ with the provider question.
  // Flip only after something public and official, with Kevin's OK.
  mode: 'compare' as 'compare' | 'provider-exit',
  // null removes the comparison and its footnote. Re-check before launch and
  // before every mailer drop.
  competitor: {
    name: 'RiverStreet',
    prices: { 'res-500': 90, 'res-1g': 115 } as Record<string, number>, // incl. their $5 recovery fee
    checkedOn: 'October 2026',
  } as null | { name: string; prices: Record<string, number>; checkedOn: string },
  utilityFee: null as number | null, // Danville Utilities fiber fee. null mentions it without a number.
  eligibleStates: ['VA'],
  attrStorageKey: 'sn_samefiber_attr',
  landingPage: '/danville-fiber',
  thankYouPath: '/danville-fiber/thank-you',
};

/** True once the Cognito form number has been filled in. */
export const sameFiberFormReady = !/x/i.test(SAME_FIBER.cognitoFormNumber);

/** True once the conversion action has been filled in. */
export const sameFiberConversionReady = !/x{4,}/i.test(SAME_FIBER.conversionSendTo);

/**
 * Internal field names on the Same Fiber Cognito form (62). Case matters.
 * Confirmed against the live form 10/13.
 * serviceAddress is a Cognito Address field, prefilled as an object.
 */
export const SAME_FIBER_FIELDS = {
  source: 'Source',
  utm_source: 'UTMSource',
  utm_medium: 'UTMMedium',
  utm_campaign: 'UTMCampaign',
  utm_content: 'UTMContent',
  gclid: 'GCLID',
  fbclid: 'FBCLID',
  landingPage: 'LandingPage',
  addressVerified: 'AddressVerified',
  serviceAddress: 'Address',
  plan: 'WhichPlan',
  howHeard: 'HowDidYouHearAboutUs',
} as const;

export const SAME_FIBER_ADDRESS_PARTS = {
  line1: 'Line1',
  line2: 'Line2',
  city: 'City',
  state: 'State',
  zip: 'PostalCode',
};

/** Full state names for the Cognito Address field. */
export const SAME_FIBER_STATE_NAMES: Record<string, string> = {
  VA: 'Virginia',
  WV: 'West Virginia',
};

/**
 * `src` values and what they mean. If src is listed, its howHeard label
 * prefills "How did you hear about us?" so the form hides it. Labels must
 * match the Cognito choices exactly.
 */
export const SAME_FIBER_SOURCES: Record<string, { meaning: string; howHeard: string }> = {
  mail1: { meaning: 'Mailer drop 1', howHeard: 'Postcard' },
  mail2: { meaning: 'Mailer drop 2', howHeard: 'Postcard' },
  google: { meaning: 'Danville Google Ads', howHeard: 'Google' },
  fb: { meaning: 'Facebook / Instagram', howHeard: 'Facebook' },
  hanger: { meaning: 'Door hanger', howHeard: 'Door Hanger' },
};

export interface SameFiberPlan {
  planId: string;
  plan: Plan;
  price: number;
  /** e.g. "500 Mbps" */
  speedLabel: string;
  /** Value sent to the Cognito "Plan" choice. */
  formValue: string;
  /** Competitor monthly price, when the comparison is on. */
  competitorPrice: number | null;
  /** (competitor price minus ours) x 12, when the comparison is on. */
  yearlySavings: number | null;
}

/** Configured plans joined with lib/plans.ts, in config order. Unknown ids are skipped. */
export function getSameFiberPlans(): SameFiberPlan[] {
  return SAME_FIBER.plans.flatMap((entry) => {
    const plan = residentialPlans.find((p) => p.id === entry.planId);
    if (!plan) return [];
    const competitorPrice = SAME_FIBER.competitor?.prices[entry.planId] ?? null;
    return [{
      planId: plan.id,
      plan,
      price: plan.price,
      speedLabel: plan.name,
      formValue: entry.formValue,
      competitorPrice,
      yearlySavings: competitorPrice !== null ? (competitorPrice - plan.price) * 12 : null,
    }];
  });
}

// Attribution capture. Browser only.

export const SAME_FIBER_ATTR_KEYS = [
  'src',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

export type SameFiberAttrKey = (typeof SAME_FIBER_ATTR_KEYS)[number];
export type SameFiberAttribution = Partial<Record<SameFiberAttrKey, string>>;

const MAX_ATTR_LENGTH = 200;

function readStoredAttribution(): SameFiberAttribution {
  try {
    const raw = window.sessionStorage.getItem(SAME_FIBER.attrStorageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const out: SameFiberAttribution = {};
    for (const key of SAME_FIBER_ATTR_KEYS) {
      if (typeof parsed[key] === 'string' && parsed[key]) out[key] = parsed[key];
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Reads attribution params from the URL and merges them into sessionStorage.
 * First touch wins within a session: a stored value is never overwritten,
 * and never replaced with an empty one. Returns the merged values.
 */
export function captureSameFiberAttribution(search: string): SameFiberAttribution {
  const stored = readStoredAttribution();
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return stored;
  }

  const merged: SameFiberAttribution = { ...stored };
  for (const key of SAME_FIBER_ATTR_KEYS) {
    const value = params.get(key)?.trim().slice(0, MAX_ATTR_LENGTH);
    if (value && !merged[key]) merged[key] = value;
  }

  try {
    window.sessionStorage.setItem(SAME_FIBER.attrStorageKey, JSON.stringify(merged));
  } catch {
    // Storage blocked (private mode, etc.). Values still work for this page view.
  }

  return merged;
}
