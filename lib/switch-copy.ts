/**
 * All user-facing copy for /switch and /switch/thank-you.
 * Draft pending Kevin's approval (Mon 9/28). Edit copy here only.
 *
 * Prices are never typed here. Functions receive them from
 * lib/switch-offer.ts and lib/plans.ts so a config change updates the copy.
 *
 * No em dashes or en dashes anywhere in this file's copy.
 */

export interface SwitchPriceVars {
  /** Switcher price, e.g. 35 */
  promo: number;
  /** Regular price after the promo, e.g. 52 */
  regular: number;
  /** Promo length in months, e.g. 6 */
  months: number;
  /** Price lock in years, e.g. 3 */
  years: number;
  /** Plan speed label, e.g. "500 Mbps" */
  speed: string;
}

export interface SwitchOfferPlanVars {
  promo: number;
  regular: number;
  speed: string;
}

/** Joins ["a", "b", "c"] as "a, b, or c". */
function orList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, or ${items[items.length - 1]}`;
}

export const SWITCH_COPY = {
  meta: {
    title: 'Switch to Fiber',
    description: 'Switch to SecureNet Fiber. Local fiber internet in the Kanawha Valley.',
    thankYouTitle: 'You\'re on your way to fiber',
  },

  header: {
    callLabel: 'Call',
  },

  hero: {
    /** `lowestPromo` is the lowest switcher price across eligible plans. */
    headline: (lowestPromo: number) => `Switch to fiber for $${lowestPromo} a month.`,
    subhead: (v: SwitchPriceVars) =>
      `$${v.promo}/mo for your first ${v.months} months. Then $${v.regular}/mo, locked for ${v.years} years. Free install. No contract.`,
    proofPoints: (v: SwitchPriceVars) => [
      '100% fiber, same speed up and down',
      `Price locked for ${v.years} years`,
      'Local people answer the phone',
    ],
  },

  /**
   * Competitor-specific headlines, keyed by the `from` URL param
   * (optimum, frontier, tmobile). Leave empty for v1. If a key exists,
   * its headline replaces the default.
   * Example: optimum: (lowestPromo) => `Leaving Optimum? Switch to fiber for $${lowestPromo} a month.`,
   */
  headlineByFrom: {} as Record<string, (lowestPromo: number) => string>,

  check: {
    heading: 'Check your address',
    sub: 'See if fiber is available at your house. It takes a few seconds.',
    label: 'Street address',
    placeholder: 'Enter your street address',
    button: 'Check My Address',
    buttonLoading: 'Checking...',
    tryAgain: 'Try again',
    checkAnother: 'Check a different address',
    signUpAnyway: 'Sign up anyway and we\'ll check it for you',

    serviceableHeading: 'You\'re in. Let\'s get you switched.',
    serviceableBody: (address: string) =>
      `Fiber is available at ${address}. Fill this out and someone from our South Charleston office will call you.`,

    notEligibleHeading: 'This offer is for the Kanawha Valley.',
    notEligibleBody: (vaPhone: string) =>
      `Good news, we do serve your address. Call us at ${vaPhone} and we'll get you set up.`,

    notServiceableHeading: 'We\'re not on your street yet.',
    notServiceableBody: 'Leave your info and we\'ll let you know the day we get there.',

    notFoundHeading: 'We couldn\'t find that exact address.',
    notFoundBody: 'Sometimes our search misses an address that\'s formatted differently. Try it again, or sign up anyway and we\'ll check it by hand.',

    errorHeading: 'We couldn\'t check that address right now.',
    errorBody: 'Give us a call and we\'ll check it for you, or sign up anyway and we\'ll check it by hand.',
  },

  waitlist: {
    addressPlaceholder: 'Your street address',
    button: 'Let Me Know',
  },

  signup: {
    heading: 'Almost done.',
    sub: 'Fill this out and someone from our South Charleston office will call you.',
    unverifiedSub: 'Fill this out and we\'ll check your address and call you.',
    pickerHeading: 'Pick your speed',
    pickerPromo: (v: SwitchOfferPlanVars, months: number) => `$${v.promo}/mo for ${months} months`,
    pickerRegular: (v: SwitchOfferPlanVars, years: number) => `Then $${v.regular}/mo, locked for ${years} years`,
    pickerChangeNote: 'Changing your speed resets the form below.',
    callHeading: 'Prefer to call?',
    callHours: 'Monday to Friday, 9 AM to 5 PM',
    priceHeading: 'Your switcher price',
  },

  why: {
    heading: 'Why people switch',
    items: (v: SwitchPriceVars) => [
      {
        title: 'Promo prices jump. Ours doesn\'t.',
        body: `Most promo rates go up after a few months. After your ${v.months} months at $${v.promo}, you pay $${v.regular}, and it stays $${v.regular} for ${v.years} years.`,
      },
      {
        title: 'Fiber doesn\'t slow down at 7pm.',
        body: '5G home internet shares the airwaves with every phone in the neighborhood. Fiber runs straight to your house.',
      },
      {
        title: 'Call us. Somebody local picks up.',
        body: 'Our office is on MacCorkle Avenue in South Charleston, and every one of us lives in the valley.',
      },
    ],
  },

  how: {
    heading: 'How switching works',
    steps: [
      { title: 'Sign up here.', body: 'It takes about two minutes.' },
      { title: 'We install for free.', body: 'Keep your old service running until we\'re live.' },
      { title: 'Cancel your old provider once you\'re online.', body: '' },
    ],
  },

  reviews: {
    heading: 'From people who already switched',
  },

  faq: {
    heading: 'Questions',
    items: (v: SwitchPriceVars) => [
      {
        question: `What happens after ${v.months} months?`,
        answer: `Your price goes to $${v.regular}/mo for ${v.speed} and stays locked there for ${v.years} years from your install date.`,
      },
      {
        question: 'Why do you want my current bill?',
        answer: `The $${v.promo} price is for people switching from another internet provider. A recent bill is how we confirm that. Upload it now or send it later. Switcher pricing starts once we have it.`,
      },
      {
        question: 'Do I cancel my old service first?',
        answer: 'No. Keep it until your fiber is installed and working, then cancel.',
      },
      {
        question: 'Is there a contract?',
        answer: 'No contract and no cancellation fee.',
      },
      {
        question: 'Is installation really free?',
        answer: 'Yes. Standard installation is free.',
      },
      {
        question: `Is ${v.speed} enough?`,
        answer: 'For most homes, yes. It handles streaming, video calls, and gaming on 10+ devices at once, with the same speed up and down.',
      },
    ],
  },

  bottomCta: {
    heading: 'Ready to switch?',
    sub: 'Check your address and see if fiber is available at your house.',
    button: 'Check your address',
  },

  finePrint: (plans: SwitchOfferPlanVars[], months: number, years: number) => {
    const promos = orList(plans.map((p) => `$${p.promo}/mo on ${p.speed}`));
    const regulars = plans.length === 1
      ? `service is $${plans[0].regular}/mo`
      : `service is ${orList(plans.map((p) => `$${p.regular}/mo for ${p.speed}`))}`;
    return `Switcher offer: ${promos} service for the first ${months} months for new residential customers switching from another internet provider. Proof of current internet service (a bill dated within the last 60 days) is required before promotional pricing applies. After ${months} months, ${regulars}, price-locked for ${years} years from installation. Free standard installation. No contract. Available at serviceable addresses in the Kanawha Valley, WV. Offer may end at any time.`;
  },

  thankYou: {
    heading: 'Got it. You\'re on your way to fiber.',
    // Body is SWITCH_OFFER.callbackPromise.
    note: 'Have your current internet bill handy when we call.',
    scheduleHeading: 'Ready to pick your install date?',
    scheduleBody: 'If you already know when works best, go ahead and schedule your installation now. Otherwise, sit tight. We\'ll be in touch soon.',
    scheduleButton: 'Schedule Installation',
    callHeading: 'Questions?',
    callHours: 'Monday to Friday, 9 AM to 5 PM',
  },

  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: (year: number) => `© ${year} SecureNet Fiber. All rights reserved.`,
  },
};
