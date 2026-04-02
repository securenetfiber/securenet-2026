'use client';

import { useState, FormEvent } from 'react';

export default function AvailabilityCheck() {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="availability" id="check">
      <div className="section-container">
        <div className="avail-box">
          {submitted ? (
            <>
              <div className="form-success-icon" style={{ marginBottom: '1rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 className="avail-heading">We&apos;ve got your address!</h2>
              <p className="avail-sub">
                We&apos;ll check availability for <strong>{address}</strong> and
                reach out within one business day. Want to get started now?
              </p>
              <a
                href="/service-request"
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Sign Up Online
              </a>
            </>
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
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Check Address
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
