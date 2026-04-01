'use client';

import { useState, useEffect } from 'react';
import type { SiteAlert } from '@/lib/alerts';

export default function AlertBar({ alert }: { alert: SiteAlert }) {
  const [dismissed, setDismissed] = useState(false);

  // Keep a class on <body> so CSS can adjust hero/page-hero top padding
  // dynamically when the alert bar is shown or dismissed.
  useEffect(() => {
    if (alert.enabled && !dismissed) {
      document.body.classList.add('has-alert-bar');
    } else {
      document.body.classList.remove('has-alert-bar');
    }
    return () => {
      document.body.classList.remove('has-alert-bar');
    };
  }, [alert.enabled, dismissed]);

  if (!alert.enabled || dismissed) return null;

  const variantClass =
    alert.variant === 'warning'
      ? ' alert-bar--warning'
      : alert.variant === 'critical'
        ? ' alert-bar--critical'
        : '';

  return (
    <div className={`alert-bar${variantClass}`} role="alert">
      <div className="alert-bar-inner">
        <span className="alert-bar-message">
          {alert.message}
          {alert.linkText && alert.linkHref && (
            <>
              {' '}
              <a href={alert.linkHref}>{alert.linkText}</a>
            </>
          )}
        </span>
        <button
          className="alert-bar-dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss alert"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
