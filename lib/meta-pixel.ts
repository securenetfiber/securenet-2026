/**
 * Meta Pixel ("SecureNet Website" dataset). The base code lives in
 * app/layout.tsx; client-side PageViews come from MetaPixelRouteTracker.
 *
 * Lead fires only on real form submits, with the same id as the Google Ads
 * transaction_id so the two can be matched up.
 */
export const META_PIXEL_ID = '228005700264159';

type MetaEvent = 'PageView' | 'Lead';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a Meta Pixel event. No-ops if the Pixel is blocked, never throws. */
export function trackMeta(event: MetaEvent, params?: Record<string, unknown>, eventId?: string) {
  try {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    if (eventId) {
      window.fbq('track', event, params ?? {}, { eventID: eventId });
    } else if (params) {
      window.fbq('track', event, params);
    } else {
      window.fbq('track', event);
    }
  } catch {
    // Tracking must never break the page
  }
}
