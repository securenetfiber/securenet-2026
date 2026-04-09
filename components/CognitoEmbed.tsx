'use client';

import { useEffect, useRef } from 'react';

interface CognitoEmbedProps {
  /** Cognito form number (from Publish > Seamless embed code) */
  formNumber: string;
  /** Optional CSS class for the wrapper div */
  className?: string;
  /** Optional entry prefill data (JSON-serializable object) */
  entryData?: Record<string, string>;
}

/**
 * Seamless Cognito Forms embed. Renders the form directly in the DOM
 * (not an iframe) so we can override styles from our stylesheet.
 *
 * To roll back to custom forms, just swap this component out for the
 * original (ContactForm, QuoteForm, etc.) in the parent page.
 */
export default function CognitoEmbed({ formNumber, className, entryData }: CognitoEmbedProps) {
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

    // Inject prefill values after Cognito renders the form.
    // Find fields by label text, set the input value natively.
    let observer: MutationObserver | undefined;
    if (entryData) {
      const filled = new Set<string>();
      observer = new MutationObserver(() => {
        if (filled.size === Object.keys(entryData).length) return;
        const labels = container.querySelectorAll('.cog-label');
        for (const label of labels) {
          const labelText = label.textContent?.trim().replace(/\*.*/, '').trim() || '';
          for (const [, value] of Object.entries(entryData)) {
            if (filled.has(labelText)) continue;
            if (labelText !== 'Referral Code') continue;
            const field = label.closest('.cog-field');
            const input = field?.querySelector<HTMLInputElement>('input');
            if (input && !input.value) {
              const setter = Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype, 'value'
              )?.set;
              setter?.call(input, value);
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              // Hide the field from view
              if (field instanceof HTMLElement) {
                field.style.display = 'none';
              }
              filled.add(labelText);
            }
          }
        }
        if (filled.size === Object.keys(entryData).length) {
          observer?.disconnect();
        }
      });
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [formNumber, entryData]);

  return (
    <div
      ref={containerRef}
      className={`cognito-embed ${className || ''}`}
    />
  );
}
