'use client';

import { useEffect } from 'react';
import { trackMeta } from '@/lib/meta-pixel';
import { trackGa } from '@/lib/analytics';

/**
 * Fires one Meta Lead per browser session for a thank-you page, so a refresh
 * doesn't count a second lead. Retries briefly while the Pixel loads. With
 * gaForm set, also sends GA4 generate_lead with the same id.
 */
export default function MetaLeadOnce({
  contentName,
  gaForm,
}: {
  contentName: string;
  gaForm?: string;
}) {
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
      const transactionId = `${contentName}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      trackMeta('Lead', { content_name: contentName }, transactionId);
      if (gaForm) trackGa('generate_lead', { form: gaForm, transaction_id: transactionId });
      try {
        sessionStorage.setItem(flag, '1');
      } catch {
        // Ignore
      }
    };
    fire();
    return () => window.clearTimeout(timer);
  }, [contentName, gaForm]);

  return null;
}
