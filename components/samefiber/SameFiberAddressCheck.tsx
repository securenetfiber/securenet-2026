'use client';

import { useState, FormEvent } from 'react';
import { COMPANY_INFO } from '@/lib/plans';
import { SAME_FIBER } from '@/lib/samefiber';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';
import { ADDRESS_CHECK } from '@/lib/address-check';

export interface SameFiberAddress {
  address: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

type CheckState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'eligible' }
  | { kind: 'unchecked'; address: string }
  | { kind: 'wrong_state' }
  | { kind: 'not_serviceable' }
  | { kind: 'not_found' }
  | { kind: 'error' };

interface SameFiberAddressCheckProps {
  /** Serviceable address in Virginia. */
  onVerified: (address: SameFiberAddress) => void;
  /** Visitor chose "sign up anyway", or the live lookup is off. */
  onSignUpAnyway: (rawAddress: string) => void;
  /** Visitor went back to the input. Hides the signup form. */
  onReset: () => void;
}

const c = SAME_FIBER_COPY.check;
const wvTel = `+1${COMPANY_INFO.phones.wv.replace(/\D/g, '')}`;

export const SAME_FIBER_CHECK_ID = 'sf-check';
export const SAME_FIBER_ADDRESS_INPUT_ID = 'sf-address';

export default function SameFiberAddressCheck({
  onVerified,
  onSignUpAnyway,
  onReset,
}: SameFiberAddressCheckProps) {
  const [address, setAddress] = useState('');
  const [state, setState] = useState<CheckState>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed || state.kind === 'loading') return;

    // Live lookup off: take the address as typed and let the CSR confirm it
    if (!ADDRESS_CHECK.enabled) {
      setState({ kind: 'unchecked', address: trimmed });
      onSignUpAnyway(trimmed);
      return;
    }

    setState({ kind: 'loading' });
    onReset();

    try {
      const res = await fetch('/api/address-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: trimmed }),
      });

      if (!res.ok) {
        setState({ kind: 'error' });
        return;
      }

      const data = await res.json();

      if (data.status === 'serviceable' && data.serviceable) {
        if (!SAME_FIBER.eligibleStates.includes(data.state)) {
          setState({ kind: 'wrong_state' });
          return;
        }
        setState({ kind: 'eligible' });
        onVerified({
          address: data.address ?? trimmed,
          line1: data.line1 ?? '',
          line2: data.line2 ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          zip: data.zip ?? '',
        });
      } else if (data.status === 'not_serviceable') {
        setState({ kind: 'not_serviceable' });
      } else {
        setState({ kind: 'not_found' });
      }
    } catch {
      setState({ kind: 'error' });
    }
  }

  function handleTryAgain() {
    setState({ kind: 'idle' });
    onReset();
    requestAnimationFrame(() => {
      document.getElementById(SAME_FIBER_ADDRESS_INPUT_ID)?.focus();
    });
  }

  const showInput = state.kind === 'idle' || state.kind === 'loading';

  return (
    <div className="sf-check-card" id={SAME_FIBER_CHECK_ID}>
      {showInput && (
        <>
          <h2 className="sf-check-heading sf-check-heading--form">{c.heading}</h2>
          <form className="sf-check-form" onSubmit={handleSubmit}>
            <label htmlFor={SAME_FIBER_ADDRESS_INPUT_ID} className="sr-only">
              {c.label}
            </label>
            <input
              className="prereg-input"
              type="text"
              id={SAME_FIBER_ADDRESS_INPUT_ID}
              name="address"
              placeholder={c.placeholder}
              autoComplete="street-address"
              maxLength={200}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={state.kind === 'loading'}
              required
            />
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={state.kind === 'loading'}
            >
              {state.kind === 'loading' ? c.buttonLoading : c.button}
            </button>
          </form>
        </>
      )}

      {state.kind === 'eligible' && (
        <div className="sf-result">
          <div className="sf-result-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="sf-check-heading">{c.serviceableHeading}</h2>
          <p className="sf-check-sub">{c.serviceableBody}</p>
          <button type="button" className="sf-link-btn" onClick={handleTryAgain}>
            {c.checkAnother}
          </button>
        </div>
      )}

      {state.kind === 'unchecked' && (
        <div className="sf-result">
          <h2 className="sf-check-heading">{c.uncheckedHeading}</h2>
          <p className="sf-check-sub">{c.uncheckedBody(state.address)}</p>
          <button type="button" className="sf-link-btn" onClick={handleTryAgain}>
            {c.changeAddress}
          </button>
        </div>
      )}

      {state.kind === 'wrong_state' && (
        <div className="sf-result">
          <h2 className="sf-check-heading">{c.wrongStateHeading}</h2>
          <p className="sf-check-sub">{c.wrongStateBody(COMPANY_INFO.phones.wv)}</p>
          <div className="sf-result-actions">
            <a href={`tel:${wvTel}`} className="btn btn-primary btn-full">
              {COMPANY_INFO.phones.wv}
            </a>
            <button type="button" className="sf-link-btn" onClick={handleTryAgain}>
              {c.checkAnother}
            </button>
          </div>
        </div>
      )}

      {state.kind === 'not_serviceable' && (
        <div className="sf-result">
          <h2 className="sf-check-heading">{c.notServiceableHeading}</h2>
          <p className="sf-check-sub">{c.notServiceableBody(SAME_FIBER.phone.display)}</p>
          <div className="sf-result-actions">
            <a href={`tel:${SAME_FIBER.phone.tel}`} className="btn btn-primary btn-full">
              {SAME_FIBER.phone.display}
            </a>
            <button type="button" className="sf-link-btn" onClick={handleTryAgain}>
              {c.checkAnother}
            </button>
          </div>
        </div>
      )}

      {(state.kind === 'not_found' || state.kind === 'error') && (
        <div className="sf-result">
          <h2 className="sf-check-heading">
            {state.kind === 'not_found' ? c.notFoundHeading : c.errorHeading}
          </h2>
          {state.kind === 'error' && (
            <p className="sf-check-sub">
              {c.errorBodyBeforePhone}
              <a href={`tel:${SAME_FIBER.phone.tel}`} className="sf-check-phone">
                {SAME_FIBER.phone.display}
              </a>
              {c.errorBodyAfterPhone}
            </p>
          )}
          <div className="sf-result-actions">
            <button type="button" className="btn btn-primary btn-full" onClick={handleTryAgain}>
              {c.tryAgain}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-full"
              onClick={() => onSignUpAnyway(address.trim())}
            >
              {c.signUpAnyway}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
