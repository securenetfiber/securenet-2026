/**
 * All user-facing copy for /danville-fiber and /danville-fiber/thank-you.
 * Downstream copy of the "Web" section of the Same Fiber copy deck
 * (SecureNet/RIVERSTREET SWITCH/Same Fiber - Copy Deck). The deck is the
 * source of truth. Change it there first, then here, word for word.
 *
 * Prices are never typed here. Functions receive them from lib/samefiber.ts
 * and lib/plans.ts so a config change updates the copy.
 *
 * RiverStreet is named only through SAME_FIBER.competitor, in the comparison
 * and its footnote.
 *
 * No em dashes or en dashes anywhere in this file's copy.
 */

import type { FaqItem } from '@/components/FaqAccordion';

export interface SameFiberFinePrintVars {
  competitorName: string | null;
  checkedOn: string | null;
  utilityFee: number | null;
  lockYears: number | null;
}

function money(n: number): string {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
}

const hero = {
  compare: {
    kicker: 'For Danville homes on city fiber',
    headline: 'Same fiber. Less money.',
    subhead: 'The fiber line in your home belongs to Danville Utilities, not your internet company. Switch to SecureNet on the line you already have.',
    proofPoints: [
      'Switched remotely, nobody comes out',
      'No contract. No recovery fee.',
      'Keep your phone number',
    ],
  },
  'provider-exit': {
    kicker: 'For Danville homes on city fiber',
    headline: 'Your fiber line isn\'t going anywhere.',
    subhead: 'The fiber in your home belongs to Danville Utilities. If you need a new internet provider, we can get you back online on the same line.',
    proofPoints: [
      'Same fiber line',
      'Switched remotely',
      'A real person picks up',
    ],
  },
};

const providerExitFaq: FaqItem = {
  question: 'What if my current provider stops service?',
  answer: 'Your fiber line stays because the city owns it. Check your address above or call us, and we\'ll get you moved over as fast as we can.',
};

export const SAME_FIBER_COPY = {
  meta: {
    /** Browser tab, used as an absolute title (no site suffix). */
    title: 'Same Fiber, Less Money | SecureNet Fiber Danville',
    description: 'Switch to SecureNet on the Danville Utilities fiber line you already have. Switched remotely, no transfer fee, no contract.',
    thankYouTitle: 'You\'re on your way | SecureNet Fiber Danville',
  },

  header: {
    callLabel: 'Call',
  },

  hero,

  check: {
    heading: 'Check your address',
    label: 'Street address',
    placeholder: 'Enter your street address',
    button: 'Check My Address',
    buttonLoading: 'Checking...',
    tryAgain: 'Try Again',
    checkAnother: 'Check a different address',
    signUpAnyway: 'Sign Up Anyway and We\'ll Check It',

    serviceableHeading: 'You\'re on city fiber. Let\'s get you switched.',
    serviceableBody: 'Fill this out and we\'ll call you to set up your switch.',

    wrongStateHeading: 'This page is for Danville.',
    wrongStateBody: (wvPhone: string) => `We serve the Kanawha Valley too. Call us at ${wvPhone}.`,

    notServiceableHeading: 'City fiber isn\'t at this address yet.',
    notServiceableBody: (vaPhone: string) => `Call us at ${vaPhone} and we'll tell you what's available.`,

    notFoundHeading: 'We couldn\'t find that exact address.',

    errorHeading: 'We couldn\'t check that address right now.',
    /** The VA phone number is rendered as a link between these two parts. */
    errorBodyBeforePhone: 'Sign up anyway and we\'ll check it, or call ',
    errorBodyAfterPhone: '.',

    // Shown while the live lookup is off (lib/address-check.ts). Not in the deck yet.
    uncheckedHeading: 'Next, we\'ll verify your address.',
    uncheckedBody: (address: string) =>
      `Fill this out and we'll make sure ${address} is on city fiber before we call.`,
    changeAddress: 'Use a different address',
  },

  comparison: {
    heading: 'Same speeds. Smaller bill.',
    speedHeader: 'Speed',
    competitorHeader: (name: string) => `${name}*`,
    ourHeader: 'SecureNet',
    perMonth: '/mo',
    savings: (yearly: number) => `Save ${money(yearly)} a year`,
    button: (speed: string) => `Choose ${speed}`,
  },

  signup: {
    serviceableIntro: (address: string) => `You're on city fiber at ${address}. Fill this out and we'll call you to set up your switch.`,
    /** Shown above the form on the "sign up anyway" path. Not in the deck yet. */
    signUpAnywayIntro: 'No problem. Fill this out and we\'ll check your address before we call.',
    /** Shown above the form while the live lookup is off. Not in the deck yet. */
    uncheckedIntro: 'Fill this out and we\'ll verify your address before we call to set up your switch.',
    callHeading: 'Prefer to call?',
    callHours: 'Monday to Friday, 9 AM to 5 PM',
    // Shown in place of the form until the Cognito form number is set. Not in the deck yet.
    fallbackHeading: 'Call us to switch.',
    fallbackBody: 'Online signup is almost ready. In the meantime, a real person will set up your switch over the phone.',
  },

  how: {
    heading: 'How switching works',
    steps: [
      { title: 'Sign up here.', body: 'Pick your speed. It takes about two minutes.' },
      { title: 'We switch you over remotely.', body: 'Nobody comes to your house. Same fiber line, no transfer fee. If you have home phone, your number comes with you.' },
      { title: 'Cancel your old provider once you\'re online with us.', body: 'Stop any autopay too, and return their equipment.' },
    ],
  },

  faq: {
    heading: 'Questions',
    items: (mode: 'compare' | 'provider-exit', utilityFee: number | null): FaqItem[] => {
      const items: FaqItem[] = [
        {
          question: 'Is it really the same fiber?',
          answer: 'Yes. The fiber line to your home is owned by Danville Utilities. Internet companies like us provide service over it. Switching changes your provider, not your line.',
        },
        {
          question: 'Will someone need to come to my house?',
          answer: 'No. The switch is done remotely.',
        },
        {
          // Mark to confirm typical downtime.
          question: 'How long will I be offline?',
          answer: 'Just a few minutes while the switch happens. We\'ll set a time with you.',
        },
        {
          question: 'Is there a fee to switch?',
          answer: 'No. There\'s no transfer fee.',
        },
        {
          question: 'Can I keep my home phone number?',
          answer: 'Yes. Tell us on the form and we\'ll move it over.',
        },
        {
          question: 'Do I cancel my old provider first?',
          answer: 'No. Wait until you\'re online with us. Then cancel your old service, stop any autopay, and return their equipment. Switching to us doesn\'t cancel your old account for you.',
        },
        {
          question: 'What\'s the fiber fee on my city utility bill?',
          answer: `That's the Danville Utilities fee for the fiber line. It's the same no matter which provider you choose.${utilityFee !== null ? ` It's ${money(utilityFee)}/mo.` : ''}`,
        },
        {
          question: 'Is there a contract?',
          answer: 'No contract and no cancellation fee.',
        },
        {
          question: 'Which speed should I pick?',
          answer: '500 Mbps handles streaming, video calls, and gaming on 10+ devices for most homes. If you have 1 Gig now and want to keep it, pick 1 Gig.',
        },
      ];
      return mode === 'provider-exit' ? [providerExitFaq, ...items] : items;
    },
  },

  bottomCta: {
    heading: 'Ready to switch?',
    button: 'Check Your Address',
  },

  /** Full disclosure, deck "Disclosures". */
  finePrint: (v: SameFiberFinePrintVars) => {
    const parts: string[] = [];
    if (v.competitorName && v.checkedOn) {
      parts.push(`*${v.competitorName} prices are residential internet pricing published at myriverstreet.net as of ${v.checkedOn}, including its required $5/mo recovery fee.`);
    }
    parts.push('SecureNet prices are for Danville residential service.');
    const fee = v.utilityFee !== null ? ` (${money(v.utilityFee)}/mo)` : '';
    parts.push(`Danville Utilities bills a separate fee for the fiber line on your city utility bill${fee}, which applies no matter which provider you choose.`);
    parts.push('No transfer fee. No contract.');
    if (v.lockYears) parts.push(`Price locked for ${v.lockYears} years from activation.`);
    parts.push('Available at serviceable addresses on the Danville Utilities fiber network. Taxes may apply.');
    return parts.join(' ');
  },

  thankYou: {
    heading: 'Got it. You\'re on your way.',
    // Body is SAME_FIBER.callbackPromise.
    noteStrong: 'Don\'t cancel your current service yet.',
    noteRest: ' We\'ll switch you over first, then you cancel.',
    callHeading: 'Questions?',
    callHours: 'Monday to Friday, 9 AM to 5 PM',
  },

  footer: {
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: (year: number) => `© ${year} SecureNet Fiber. All rights reserved.`,
  },
};
