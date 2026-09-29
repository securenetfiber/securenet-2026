/**
 * Contract and early termination fee (ETF) terms, shared by the site FAQ,
 * the FCC broadband labels, and /switch.
 *
 * The 90-day ETF was dropped company-wide on 9/29, so etfEnabled is false and
 * everything reads "No contract." To bring an ETF back, set etfEnabled: true
 * and fill in etfAmount; the wording, FAQ answers, and labels follow.
 *
 * NOTE: app/legal/terms/page.tsx still describes a $200 "drop recovery fee."
 * It isn't confirmed whether that is this fee or a separate one, so the terms
 * page does not read from this config.
 */
export const CONTRACT = {
  etfEnabled: false,
  etfWindowDays: 90,
  etfAmount: null as number | null,
  etfWaivedForSwitchers: false, // only matters when etfEnabled is true
};

/** True when no ETF applies. `forSwitchers` is only for /switch. */
export function etfWaived(forSwitchers = false): boolean {
  return !CONTRACT.etfEnabled || (forSwitchers && CONTRACT.etfWaivedForSwitchers);
}

/** "No contract", or "No long-term contract" when an ETF applies. */
export function contractShortWording(forSwitchers = false): string {
  return etfWaived(forSwitchers) ? 'No contract' : 'No long-term contract';
}

/** The ETF disclosure sentence, or '' when no ETF applies. */
export function etfSentence(forSwitchers = false): string {
  if (etfWaived(forSwitchers)) return '';
  const days = CONTRACT.etfWindowDays;
  const fee = CONTRACT.etfAmount === null
    ? 'An early termination fee'
    : `A $${CONTRACT.etfAmount} early termination fee`;
  return `${fee} applies if service is canceled within the first ${days} days. After ${days} days, cancel anytime with no fee.`;
}

/** Answer to "Is there a contract?" on /switch and the site FAQ. */
export function contractFaqAnswer(forSwitchers = false): string {
  if (etfWaived(forSwitchers)) return 'No contract and no cancellation fee.';
  return `No long-term contract. ${etfSentence(forSwitchers)}`;
}

/** Early Termination Fee value for the FCC broadband label. */
export function etfLabelValue(): string {
  if (!CONTRACT.etfEnabled) return 'None';
  const days = CONTRACT.etfWindowDays;
  return CONTRACT.etfAmount === null
    ? `Applies within first ${days} days`
    : `$${CONTRACT.etfAmount} within first ${days} days`;
}
