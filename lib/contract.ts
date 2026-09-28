/**
 * Contract and early termination fee (ETF) terms, shared by the site-wide
 * plan data, the FCC broadband labels, and /switch.
 *
 * Kevin decides etfAmount and etfWaivedForSwitchers. Each is a one-line change.
 * NOTE: app/legal/terms/page.tsx currently describes this fee as a $200
 * "drop recovery fee." Keep the two in sync once the amount is confirmed.
 */
export const CONTRACT = {
  etfWindowDays: 90,
  etfAmount: null as number | null, // Josh fills in once Kevin confirms, e.g. 150
  etfWaivedForSwitchers: false,     // true if Kevin waives the ETF on /switch
};

/** True when the ETF does not apply. `forSwitchers` is only for /switch. */
export function etfWaived(forSwitchers = false): boolean {
  return forSwitchers && CONTRACT.etfWaivedForSwitchers;
}

/** "No long-term contract", or "No contract" when the ETF is waived. */
export function contractShortWording(forSwitchers = false): string {
  return etfWaived(forSwitchers) ? 'No contract' : 'No long-term contract';
}

/**
 * The ETF disclosure sentence, or '' when the ETF is waived.
 * With no amount set: "An early termination fee applies if service is
 * canceled within the first 90 days. After 90 days, cancel anytime with no fee."
 */
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
  const days = CONTRACT.etfWindowDays;
  return CONTRACT.etfAmount === null
    ? `Applies within first ${days} days`
    : `$${CONTRACT.etfAmount} within first ${days} days`;
}
