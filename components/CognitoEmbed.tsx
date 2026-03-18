'use client';

import { useEffect, useRef } from 'react';

interface CognitoEmbedProps {
  /** Cognito org/form path, e.g. "SecureNet4/ContactUs" */
  formId: string;
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
export default function CognitoEmbed({ formId, className }: CognitoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cognito seamless embed expects a global ExoJQuery / Cognito object.
    // Their script loads once, finds elements with data attributes, and renders.
    const script = document.createElement('script');
    script.src = 'https://www.cognitoforms.com/f/seamless.js';
    script.dataset.key = 'SecureNet4';
    script.dataset.form = formId;
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [formId]);

  return (
    <div
      ref={containerRef}
      className={`cognito-embed ${className || ''}`}
    />
  );
}
