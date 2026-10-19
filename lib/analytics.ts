/**
 * Google Analytics 4 (securenetfiber.com web stream). Shares the gtag.js load
 * in app/layout.tsx with Google Ads. Page views, including client-side
 * navigations, come from GA4 Enhanced Measurement, so never send page_view
 * manually here.
 */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-FTXGLD5EDP';

/** Fire a GA4 event. No-ops if gtag is blocked, never throws. */
export function trackGa(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', event, { ...params, send_to: GA4_ID });
  } catch {
    // Tracking must never break the page
  }
}
