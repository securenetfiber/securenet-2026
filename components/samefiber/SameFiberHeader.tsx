'use client';

import { useState, useEffect } from 'react';
import AlertBar from '@/components/AlertBar';
import type { SiteAlert } from '@/lib/alerts';
import { SAME_FIBER } from '@/lib/samefiber';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';

// Minimal header for /danville-fiber: logo (not linked) and click to call.
export default function SameFiberHeader({ alert }: { alert: SiteAlert }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' header--scrolled' : ''}${alert.enabled ? ' header--with-alert' : ''}`}>
      <AlertBar alert={alert} />
      <nav className="nav-container sf-nav">
        <span className="logo">
          <img src="/img/SN-Logo-Master.png" alt="SecureNet" height={36} />
        </span>
        <a href={`tel:${SAME_FIBER.phone.tel}`} className="btn btn-primary sf-call-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          <span className="sf-call-label">{SAME_FIBER_COPY.header.callLabel}</span>
          <span>{SAME_FIBER.phone.display}</span>
        </a>
      </nav>
    </header>
  );
}
