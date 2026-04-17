'use client';

import { useState, FormEvent } from 'react';

export default function PreRegForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/prereg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us at (304) 744-4034.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3>You&apos;re on the list!</h3>
        <p>We&apos;ll reach out as soon as fiber is available at your address.</p>
      </div>
    );
  }

  return (
    <form className="prereg-form" onSubmit={handleSubmit}>
      <div className="prereg-field">
        <label className="prereg-label" htmlFor="prereg-name">Name</label>
        <input className="prereg-input" type="text" id="prereg-name" name="name" placeholder="Your name" required />
      </div>
      <div className="prereg-field">
        <label className="prereg-label" htmlFor="prereg-email">Email</label>
        <input className="prereg-input" type="email" id="prereg-email" name="email" placeholder="you@example.com" required />
      </div>
      <div className="prereg-field">
        <label className="prereg-label" htmlFor="prereg-address">Address</label>
        <input className="prereg-input" type="text" id="prereg-address" name="address" placeholder="Your street address in St. Albans" required />
      </div>
      <div className="prereg-field">
        <label className="prereg-label" htmlFor="prereg-phone">
          Phone <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span>
        </label>
        <input className="prereg-input" type="tel" id="prereg-phone" name="phone" placeholder="(304) 555-1234" />
      </div>
      {error && <p className="prereg-error">{error}</p>}
      <button type="submit" className="prereg-btn" disabled={loading}>
        {loading ? 'Submitting…' : 'Pre-Register for Fiber'}
      </button>
    </form>
  );
}
