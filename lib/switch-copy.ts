/**
 * All user-facing copy for /switch and /switch/thank-you.
 * Downstream copy of section 5 ("Web: /switch") of the Obsidian copy deck:
 * Marketing/Campaigns/Switch to Fiber - Fall 2026.md. The deck is the source
 * of truth. Change it there first, then here, word for word.
 *
 * Prices are never typed here. Functions receive them from
 * lib/switch-offer.ts and lib/plans.ts so a config change updates the copy.
 * Contract and early termination fee wording comes from lib/contract.ts.
 *
 * No em dashes or en dashes anywhere in this file's copy.
 */

import { contractShortWording, contractFaqAnswer, etfSentence } from '@/lib/contract';

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

// /switch uses the switcher contract terms (waivable), the rest of the site doesn't.
const FOR_SWITCHERS = true;

export const SWITCH_COPY = {
  meta: {
    /** Browser tab. The site template adds " | SecureNet Fiber". */
    title: (lowestPromo: number) => `Switch to Local Fiber for $${lowestPromo}/mo`,
    description: 'Switch to SecureNet Fiber. Local fiber internet in the Kanawha Valley.',
    thankYouTitle: 'You\'re on your way to fiber',
  },

  header: {
    callLabel: 'Call',
  },

  hero: {
    /** `lowestPromo` is the lowest switcher price across eligible plans. */
    headline: (lowestPromo: number) => `Switch to local fiber for $${lowestPromo} a month.`,
    subhead: (v: SwitchPriceVars) =>
      `For your first ${v.months} months when you switch from another provider. Then $${v.regular}, locked for ${v.years} years. Free install. ${contractShortWording(FOR_SWITCHERS)}.`,
    proofPoints: [
      '100% fiber, same speed up and down',
      'No data caps',
      'Local people answer the phone',
    ],
  },

  // For current customers who see the ad or mailer. Shown in the hero.
  // Not in the copy deck yet (added at Josh's request 9/25).
  currentCustomer: {
    heading: 'Already a customer?',
    body: 'Thanks for being with us. Ask us how to get a free month by putting a SecureNet yard sign in your yard.',
    callLabel: (phone: string) => `Call ${phone}`,
  },

  /**
   * Competitor-specific headlines, keyed by the `from` URL param.
   * If a key exists, its headline replaces the default.
   */
  headlineByFrom: {
    optimum: (lowestPromo: number) => `Done with Optimum price hikes? Switch to local fiber for $${lowestPromo}.`,
    frontier: (lowestPromo: number) => `Frontier is Verizon now. Switch to local fiber for $${lowestPromo}.`,
    tmobile: (lowestPromo: number) => `Tired of 5G slowing down at night? Switch to local fiber for $${lowestPromo}.`,
  } as Record<string, (lowestPromo: number) => string>,

  check: {
    heading: 'Check your address',
    label: 'Street address',
    placeholder: 'Enter your street address',
    button: 'Check My Address',
    buttonLoading: 'Checking...',
    tryAgain: 'Try Again',
    checkAnother: 'Check a different address',
    signUpAnyway: 'Sign Up Anyway',

    serviceableHeading: 'You\'re in. Let\'s get you switched.',
    serviceableBody: (address: string) =>
      `Fiber is available at ${address}. Fill this out and someone from our South Charleston office will call you.`,

    notEligibleHeading: 'This offer is for the Kanawha Valley.',
    notEligibleBody: (vaPhone: string) =>
      `Good news, we do serve your address. Call us at ${vaPhone} and we'll get you set up.`,

    notServiceableHeading: 'We\'re not on your street yet.',
    notServiceableBody: 'Leave your info and we\'ll let you know the day we get there.',

    notFoundHeading: 'We couldn\'t find that exact address.',
    notFoundBody: 'It might be a typo, or our system didn\'t like the format. Try again, or sign up and we\'ll check it for you.',

    errorHeading: 'We couldn\'t check that address right now.',
    /** The WV phone number is rendered as a link between these two parts. */
    errorBodyBeforePhone: 'Sign up anyway and we\'ll check it for you, or call us at ',
    errorBodyAfterPhone: '.',
  },

  waitlist: {
    addressPlaceholder: 'Your street address',
    button: 'Let Me Know',
  },

  signup: {
    /** Shown above the form on the "sign up anyway" path. */
    signUpAnywayIntro: 'No problem. Fill this out and we\'ll confirm your address before we call.',
    pickerHeading: 'Pick your speed',
    pickerPromo: (v: SwitchOfferPlanVars, months: number) => `$${v.promo}/mo for ${months} months`,
    pickerRegular: (v: SwitchOfferPlanVars, years: number) => `Then $${v.regular}/mo, locked for ${years} years`,
    pickerChangeNote: 'Changing your speed resets the form below.',
    callHeading: 'Prefer to call?',
    callHours: 'Monday to Friday, 9 AM to 5 PM',
    priceHeading: 'Your switcher price',
  },

  why: {
    heading: 'Why switch',
    items: (v: SwitchPriceVars) => [
      {
        title: `$${v.promo} now. $${v.regular} later. That's it.`,
        body: `Most promo rates go up and keep going up. Ours goes up once: after your ${v.months} months at $${v.promo}, you pay $${v.regular}, and it stays $${v.regular} for ${v.years} years from install. You'll know every price before you sign up.`,
      },
      {
        title: 'Real fiber, all the way to your house.',
        body: 'Same speed up and down, no data caps, and no sharing the airwaves with every phone on your street. It doesn\'t slow down when the neighborhood gets home.',
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
      { title: 'We call you, then install for free.', body: 'Keep your old service running until we\'re live.' },
      { title: 'Once you\'re online, cancel your old provider.', body: '' },
    ],
  },

  reviews: {
    heading: 'What your neighbors say',
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
        question: 'What if I don\'t have internet right now?',
        answer: `The $${v.promo} price is for switchers, but you can still sign up at our regular price of $${v.regular}/mo, locked for ${v.years} years.`,
      },
      {
        question: 'I\'m in a contract with my current provider. Now what?',
        answer: 'Check your bill or account for an early termination fee before you cancel. Most home internet plans don\'t have contracts anymore, but it\'s worth a look.',
      },
      {
        question: 'Do I cancel my old service first?',
        answer: 'No. Keep it until your fiber is installed and working, then cancel.',
      },
      {
        question: 'Is there a contract?',
        answer: contractFaqAnswer(FOR_SWITCHERS),
      },
      {
        question: 'Is installation really free?',
        answer: 'Yes. Standard installation is free.',
      },
      {
        question: 'Do I need to be home for the install?',
        answer: 'Yes, someone 18 or older needs to be there. We\'ll set a time that works for you.',
      },
      {
        question: `Is ${v.speed} enough?`,
        answer: 'For most homes, yes. It handles streaming, video calls, and gaming on 10+ devices at once, with the same speed up and down.',
      },
      {
        question: 'Can I get faster speeds?',
        answer: `Yes. The switcher price is on ${v.speed}, and 1 Gig and faster are available at regular pricing.`,
      },
    ],
  },

  bottomCta: {
    heading: 'Ready to switch?',
    button: 'Check Your Address',
  },

  /** Full disclosure, deck section 4. */
  finePrint: (plans: SwitchOfferPlanVars[], months: number, years: number) => {
    const promos = orList(plans.map((p) => `$${p.promo}/mo for the first ${months} months on ${p.speed} service`));
    const regulars = plans.length === 1
      ? `service is $${plans[0].regular}/mo`
      : `service is ${orList(plans.map((p) => `$${p.regular}/mo for ${p.speed}`))}`;
    const contract = [`${contractShortWording(FOR_SWITCHERS)}.`, etfSentence(FOR_SWITCHERS)].filter(Boolean).join(' ');
    return `Switcher offer: ${promos} for new residential customers switching from another internet provider. Proof of current internet service (a bill dated within the last 60 days) is required before promotional pricing applies. After ${months} months, ${regulars}, price-locked for ${years} years from installation. Free standard installation. ${contract} Available at serviceable addresses in the Kanawha Valley, WV. Offer may end at any time for new signups.`;
  },

  thankYou: {
    heading: 'Got it. You\'re on your way to fiber.',
    // Body is SWITCH_OFFER.callbackPromise.
    note: 'Have your current internet bill handy when we call.',
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
