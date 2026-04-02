'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AlertBar from '@/components/AlertBar';
import { siteAlert } from '@/lib/alerts';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' header--scrolled' : ''}${menuOpen ? ' menu-open' : ''}${siteAlert.enabled ? ' header--with-alert' : ''}`}>
      <AlertBar alert={siteAlert} />
      <nav className="nav-container">
        <Link href="/" className="logo" aria-label="SecureNet Fiber home">
          <img src="/img/SN-Logo-Master.png" alt="SecureNet" height={36} />
        </Link>
        <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`} role="list">
          <li><Link href="/residential/">Residential</Link></li>
          <li><Link href="/business/">Business</Link></li>
          <li><Link href="/coverage/">Coverage</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className={`nav-actions${menuOpen ? ' nav-actions--open' : ''}`}>
          <a href="https://billing.securenetfiber.com" className="btn btn-ghost btn-sm">Bill Pay</a>
          <Link href="/service-request" className="btn btn-primary">Sign Up</Link>
        </div>
        <button
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
}
