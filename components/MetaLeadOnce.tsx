'use client';

import { useEffect } from 'react';
import { trackMeta } from '@/lib/meta-pixel';

/**
 * Fires one Meta Lead per browser session for a thank-you page, so a refresh
 * doesn't count a second lead. Retries briefly while the Pixel loads.
 */
export default function MetaLeadOnce({ contentName }: { contentName: string }) {
  useEffect(() => {
    const flag = `meta_lead_${contentName}`;
    try {
      if (sessionStorage.getItem(flag)) return;
    } catch {
      // Storage blocked, fire anyway
    }

    let tries = 0;
    let timer: number | undefined;
    const fire = () => {
      if (typeof window.fbq !== 'function' && tries++ < 20) {
        timer = window.setTimeout(fire, 250);
        return;
      }
      trackMeta('Lead', { content_name: contentName });
      try {
        sessionStorage.setItem(flag, '1');
      } catch {
        // Ignore
      }
    };
    fire();
    return () => window.clearTimeout(timer);
  }, [contentName]);

  return null;
}
