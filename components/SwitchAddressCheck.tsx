'use client';

import { useState, FormEvent } from 'react';
import PreRegForm from '@/components/PreRegForm';
import { COMPANY_INFO } from '@/lib/plans';
import { SWITCH_OFFER } from '@/lib/switch-offer';
import { SWITCH_COPY } from '@/lib/switch-copy';

export interface VerifiedAddress {
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
  | { kind: 'eligible'; address: string }
  | { kind: 'not_eligible' }
  | { kind: 'not_serviceable' }
  | { kind: 'not_found' }
  | { kind: 'error' };

interface SwitchAddressCheckProps {
  /** Serviceable address in an eligible state. */
  onVerified: (address: VerifiedAddress) => void;
  /** Visitor chose "sign up anyway" after a not-found or error result. */
  onSignUpAnyway: (rawAddress: string) => void;
  /** Visitor went back to the input. Hides the signup form. */
  onReset: () => void;
  /** Attribution values passed through to the waitlist form. */
  attribution: Record<string, string>;
}

const c = SWITCH_COPY.check;
const vaTel = `+1${COMPANY_INFO.phones.va.replace(/\D/g, '')}`;

export const SWITCH_ADDRESS_INPUT_ID = 'switch-address';

export default function SwitchAddressCheck({
  onVerified,
  onSignUpAnyway,
  onReset,
  attribution,
}: SwitchAddressCheckProps) {
  const [address, setAddress] = useState('');
  const [state, setState] = useState<CheckState>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed || state.kind === 'loading') return;

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
        const eligible = (SWITCH_OFFER.eligibleStates as string[]).includes(data.state);
        if (!eligible) {
          setState({ kind: 'not_eligible' });
          return;
        }
        setState({ kind: 'eligible', address: data.address });
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
      document.getElementById(SWITCH_ADDRESS_INPUT_ID)?.focus();
    });
  }

  const showInput = state.kind === 'idle' || state.kind === 'loading';

  return (
    <div className="switch-check-card" id="switch-check">
      {showInput && (
        <>
          <h2 className="switch-check-heading">{c.heading}</h2>
          <p className="switch-check-sub">{c.sub}</p>
          <form className="switch-check-form" onSubmit={handleSubmit}>
            <label htmlFor={SWITCH_ADDRESS_INPUT_ID} className="sr-only">
              {c.label}
            </label>
            <input
              className="prereg-input"
              type="text"
              id={SWITCH_ADDRESS_INPUT_ID}
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
        <div className="switch-result">
          <div className="switch-result-icon switch-result-icon--yes">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="switch-check-heading">{c.serviceableHeading}</h2>
          <p className="switch-check-sub">{c.serviceableBody(state.address)}</p>
          <button type="button" className="switch-link-btn" onClick={handleTryAgain}>
            {c.checkAnother}
          </button>
        </div>
      )}

      {state.kind === 'not_eligible' && (
        <div className="switch-result">
          <h2 className="switch-check-heading">{c.notEligibleHeading}</h2>
          <p className="switch-check-sub">{c.notEligibleBody(COMPANY_INFO.phones.va)}</p>
          <div className="switch-result-actions">
            <a href={`tel:${vaTel}`} className="btn btn-primary btn-full">
              {COMPANY_INFO.phones.va}
            </a>
            <button type="button" className="switch-link-btn" onClick={handleTryAgain}>
              {c.checkAnother}
            </button>
          </div>
        </div>
      )}

      {state.kind === 'not_serviceable' && (
        <div className="switch-result">
          <h2 className="switch-check-heading">{c.notServiceableHeading}</h2>
          <p className="switch-check-sub">{c.notServiceableBody}</p>
          <PreRegForm
            addressPlaceholder={SWITCH_COPY.waitlist.addressPlaceholder}
            defaultAddress={address.trim()}
            buttonText={SWITCH_COPY.waitlist.button}
            source={SWITCH_OFFER.waitlistSource}
            attribution={attribution}
          />
          <button type="button" className="switch-link-btn" onClick={handleTryAgain}>
            {c.checkAnother}
          </button>
        </div>
      )}

      {(state.kind === 'not_found' || state.kind === 'error') && (
        <div className="switch-result">
          <h2 className="switch-check-heading">
            {state.kind === 'not_found' ? c.notFoundHeading : c.errorHeading}
          </h2>
          <p className="switch-check-sub">
            {state.kind === 'not_found' ? c.notFoundBody : c.errorBody}
          </p>
          {state.kind === 'error' && (
            <a href={`tel:${SWITCH_OFFER.phone.tel}`} className="switch-check-phone">
              {SWITCH_OFFER.phone.display}
            </a>
          )}
          <div className="switch-result-actions">
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => onSignUpAnyway(address.trim())}
            >
              {c.signUpAnyway}
            </button>
            <button type="button" className="btn btn-ghost btn-full" onClick={handleTryAgain}>
              {c.tryAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
