'use client';

import { useEffect, useRef } from 'react';

const COGNITO_KEY = 'FrTHh_lhS0Wf_HJ86stkIg';
const SEAMLESS_SRC = 'https://www.cognitoforms.com/f/seamless.js';

/** Event passed to Cognito seamless-embed handlers (e.g. afterSubmit). */
export interface CognitoEvent {
  type?: string;
  data?: {
    entry?: Record<string, unknown> & {
      Id?: string;
      Number?: number | string;
      Entry?: { Number?: number | string };
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface CognitoFormHandle {
  prefill: (data: Record<string, unknown> | string) => CognitoFormHandle;
  on: (event: string, handler: (e: CognitoEvent) => void) => CognitoFormHandle;
  destroy?: () => void;
}

type CognitoGlobal = (key: string) => {
  mount: (formId: string, target: string | HTMLElement) => CognitoFormHandle;
};

declare global {
  interface Window {
    Cognito?: CognitoGlobal;
  }
}

interface CognitoEmbedProps {
  /** Cognito form number (from Publish > Seamless embed code) */
  formNumber: string;
  /** Optional CSS class for the wrapper div */
  className?: string;
  /**
   * Optional field values to prefill, keyed by Cognito internal field name
   * (hidden fields included). Applied once when the form mounts. Cognito only
   * accepts one prefill per form, so change the component `key` to remount
   * with new values.
   */
  prefill?: Record<string, unknown>;
  /** Optional handler for Cognito's afterSubmit event (entry saved). */
  onAfterSubmit?: (event: CognitoEvent) => void;
}

let seamlessLoader: Promise<void> | null = null;

function loadSeamless(): Promise<void> {
  if (window.Cognito) return Promise.resolve();
  if (!seamlessLoader) {
    seamlessLoader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SEAMLESS_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        seamlessLoader = null;
        reject(new Error('Failed to load Cognito seamless.js'));
      };
      document.head.appendChild(script);
    });
  }
  return seamlessLoader;
}

/**
 * Seamless Cognito Forms embed. Renders the form directly in the DOM
 * (not an iframe) so we can override styles from our stylesheet.
 *
 * To roll back to custom forms, just swap this component out for the
 * original (ContactForm, QuoteForm, etc.) in the parent page.
 */
export default function CognitoEmbed({ formNumber, className, prefill, onAfterSubmit }: CognitoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefillRef = useRef(prefill);
  const afterSubmitRef = useRef(onAfterSubmit);
  afterSubmitRef.current = onAfterSubmit;

  // Callers that need prefill or events use Cognito's JS mount API so they
  // get a handle on this exact form. Everyone else keeps the plain script tag.
  const useMountApi = Boolean(prefill || onAfterSubmit);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!useMountApi) {
      const script = document.createElement('script');
      script.src = SEAMLESS_SRC;
      script.dataset.key = COGNITO_KEY;
      script.dataset.form = formNumber;
      script.async = true;

      container.appendChild(script);

      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
    }

    let cancelled = false;
    let form: CognitoFormHandle | null = null;

    loadSeamless()
      .then(() => {
        if (cancelled || !window.Cognito) return;
        // Cognito replaces the mount target, so give it a child of our own
        const target = document.createElement('div');
        container.appendChild(target);
        form = window.Cognito(COGNITO_KEY).mount(formNumber, target);
        if (prefillRef.current) form.prefill(prefillRef.current);
        form.on('afterSubmit', (event) => afterSubmitRef.current?.(event));
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
      try {
        form?.destroy?.();
      } catch {
        // Already torn down
      }
      container.innerHTML = '';
    };
  }, [formNumber, useMountApi]);

  return (
    <div
      ref={containerRef}
      className={`cognito-embed ${className || ''}`}
    />
  );
}
