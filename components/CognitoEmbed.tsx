'use client';

import { useEffect, useRef } from 'react';

interface CognitoEmbedProps {
  /** Cognito form number (from Publish > Seamless embed code) */
  formNumber: string;
  /** Optional CSS class for the wrapper div */
  className?: string;
}

/**
 * Seamless Cognito Forms embed. Renders the form directly in the DOM
 * (not an iframe) so we can override styles from our stylesheet.
 *
 * To roll back to custom forms, just swap this component out for the
 * original (ContactForm, QuoteForm, etc.) in the parent page.
 */
export default function CognitoEmbed({ formNumber, className }: CognitoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://www.cognitoforms.com/f/seamless.js';
    script.dataset.key = 'FrTHh_lhS0Wf_HJ86stkIg';
    script.dataset.form = formNumber;
    script.async = true;

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [formNumber]);

  return (
    <div
      ref={containerRef}
      className={`cognito-embed ${className || ''}`}
    />
  );
}
