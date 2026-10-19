'use client';

import { useEffect } from 'react';
import { trackGa } from '@/lib/analytics';
import { trackMeta } from '@/lib/meta-pixel';

/**
 * One delegated listener for every tel: link on the site. Sends GA4
 * click_to_call and Meta Contact.
 */
export default function CallClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      trackGa('click_to_call', {
        link_url: link.getAttribute('href'),
        page_path: window.location.pathname,
      });
      trackMeta('Contact');
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
