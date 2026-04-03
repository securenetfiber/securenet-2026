'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface CheckResult {
  serviceable: boolean;
  status: string;
  address?: string;
}

export default function AvailabilityCheck() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(false);

    try {
      const res = await fetch('/api/address-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: address.trim() }),
      });

      if (!res.ok) {
        setError(true);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(false);
    setAddress('');
  }

  return (
    <section className="availability" id="check">
      <div className="section-container">
        <div className="avail-box">
          {error ? (
            <>
              <div className="avail-icon avail-icon--error">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <h2 className="avail-heading">Something went wrong.</h2>
              <p className="avail-sub">
                We couldn&apos;t check that address right now. Give us a call and
                we&apos;ll check for you.
              </p>
              <div className="avail-phones">
                <a href="tel:+13047444034" className="avail-phone-link">WV: (304) 744-4034</a>
                <a href="tel:+14343540101" className="avail-phone-link">VA: (434) 354-0101</a>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
                style={{ marginTop: '1rem' }}
              >
                Try Again
              </button>
            </>
          ) : result ? (
            result.serviceable ? (
              <>
                <div className="avail-icon avail-icon--yes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2 className="avail-heading">Great news! We&apos;re in your area.</h2>
                <p className="avail-sub">
                  SecureNet Fiber is available at <strong>{result.address}</strong>.
                  Ready to get connected?
                </p>
                <div className="avail-actions">
                  <Link href="/service-request" className="btn btn-primary">
                    Sign Up
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleReset}
                  >
                    Check Another Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="avail-icon avail-icon--no">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </div>
                <h2 className="avail-heading">We&apos;re not in your area yet.</h2>
                <p className="avail-sub">
                  We don&apos;t have coverage at that address right now, but we&apos;re
                  expanding. Let us know you&apos;re interested and we&apos;ll reach
                  out when we get there.
                </p>
                <div className="avail-actions">
                  <Link
                    href="/contact"
                    className="btn btn-primary"
                  >
                    Contact Us
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleReset}
                  >
                    Try Another Address
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <h2 className="avail-heading">See if we&apos;re in your neighborhood.</h2>
              <p className="avail-sub">
                Enter your address and we&apos;ll let you know if SecureNet Fiber is
                available at your location.
              </p>
              <form className="avail-form" onSubmit={handleSubmit}>
                <div className="avail-input-group">
                  <label htmlFor="address" className="sr-only">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your street address"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Checking...' : 'Check Address'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
