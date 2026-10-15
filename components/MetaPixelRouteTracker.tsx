'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackMeta } from '@/lib/meta-pixel';

/**
 * Fires a Meta PageView on App Router navigations. The base code in the
 * layout already counts the first load, so the first render is skipped.
 */
export default function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? '';
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    const url = `${pathname}?${search}`;
    if (lastUrl.current === null) {
      lastUrl.current = url;
      return;
    }
    if (url === lastUrl.current) return;
    lastUrl.current = url;
    trackMeta('PageView');
  }, [pathname, search]);

  return null;
}
