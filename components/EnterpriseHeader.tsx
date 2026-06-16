'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Services', href: '/enterprise/services' },
  { label: 'Who We Work With', href: '/enterprise/clients' },
  { label: 'Why SecureNet', href: '/enterprise/why-securenet' },
  { label: 'Contact', href: '/enterprise/contact' },
];

export default function EnterpriseHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={`ent-header${scrolled ? ' ent-header--scrolled' : ''}${menuOpen ? ' ent-menu-open' : ''}`}>
      <nav className="ent-nav-container">
        <Link href="/enterprise" className="ent-logo" aria-label="SecureNet Enterprise home">
          <img src="/img/White-NoTagline.png" alt="SecureNet" height={32} />
          <span className="ent-logo-label">Enterprise</span>
        </Link>
        <Link href="/" className="ent-main-site-link">
          &larr; SecureNet Home
        </Link>
        <ul className={`ent-nav-links${menuOpen ? ' ent-nav-links--open' : ''}`} role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? 'ent-nav-active' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={`ent-nav-actions${menuOpen ? ' ent-nav-actions--open' : ''}`}>
          <a href="tel:+13047444667" className="btn ent-btn-primary">
            (304) 744-4667
          </a>
        </div>
        <button
          className="ent-mobile-toggle"
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
