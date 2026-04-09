'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ReferralShare from './ReferralShare';
import PlanCard from './PlanCard';
import { homePreviewPlans } from '@/lib/plans';
import { isValidReferralCode } from '@/lib/referral';
import type { Plan } from '@/lib/plans';

export default function ReferralGenerator() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  const isReferred = refCode && isValidReferralCode(refCode);

  // --- Generator state ---
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ code: string; shareUrl: string } | null>(null);

  // --- Referral card code entry ---
  const [cardCode, setCardCode] = useState('');
  const [cardError, setCardError] = useState('');

  // If user manually enters a card code, redirect
  function handleCardSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = cardCode.trim().toUpperCase();
    if (!isValidReferralCode(code)) {
      setCardError('Please enter a valid referral code (e.g. SNF-A3B7K2).');
      return;
    }
    window.location.href = `/referral?ref=${code}`;
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          account: account.trim(),
          email: email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Build plan cards with referral-aware CTAs
  function planCtaHref(plan: Plan) {
    const ref = isReferred ? refCode : result?.code;
    if (ref) return `/service-request?ref=${ref}`;
    return plan.ctaHref || '/service-request';
  }

  // ─── Referred friend view ───────────────────────────────────
  if (isReferred) {
    return (
      <>
        {/* Welcome section */}
        <section className="ref-welcome" id="referred">
          <div className="section-container">
            <div className="ref-welcome-card">
              <div className="ref-welcome-badge">Referral Applied</div>
              <h2>You&apos;ve been invited to try SecureNet Fiber.</h2>
              <p>
                A friend referred you to SecureNet. Sign up for any plan and you&apos;ll
                <strong> both get a free month</strong> of internet after your installation.
              </p>
              <a href={`/service-request?ref=${refCode}`} className="btn btn-primary btn-lg">
                Sign Up Now
              </a>
            </div>
          </div>
        </section>

        {/* Plan cards */}
        <section className="ref-plans" id="plans">
          <div className="section-container">
            <h2 className="section-heading">Pick your plan.</h2>
            <p className="section-sub">
              Every plan includes the same upload and download speeds, no data caps, and no contracts.
            </p>
            <div className="plan-grid">
              {homePreviewPlans.map((plan) => (
                <div key={plan.id} className="plan-card-wrapper">
                  <PlanCard plan={{ ...plan, ctaHref: planCtaHref(plan) }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  // ─── Existing customer / generator view ─────────────────────
  return (
    <>
      <section className="ref-generate" id="generate">
        <div className="section-container">
          <div className="ref-generate-layout">
            {/* Generator form or result */}
            <div className="ref-form-area">
              {result ? (
                <>
                  <h2>Your referral link is ready.</h2>
                  <p>Share it with friends and family. When they sign up and get installed, you both get a free month.</p>
                  <ReferralShare code={result.code} shareUrl={result.shareUrl} />
                </>
              ) : (
                <>
                  <h2>Get your referral link.</h2>
                  <p>
                    Enter your account details to generate a unique referral link you can share.
                  </p>
                  <form className="ref-form" onSubmit={handleGenerate}>
                    <div className="ref-form-group">
                      <label htmlFor="ref-name">Your Name</label>
                      <input
                        id="ref-name"
                        type="text"
                        className="ref-form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="ref-form-group">
                      <label htmlFor="ref-account">Account Number or Phone</label>
                      <input
                        id="ref-account"
                        type="text"
                        className="ref-form-input"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="e.g. 10045 or (304) 555-0123"
                        required
                      />
                    </div>
                    <div className="ref-form-group">
                      <label htmlFor="ref-email">Email Address</label>
                      <input
                        id="ref-email"
                        type="email"
                        className="ref-form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="ref-error">{error}</p>}
                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={loading}
                    >
                      {loading ? 'Generating...' : 'Get My Referral Link'}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Card code sidebar */}
            <div className="ref-card-sidebar">
              <div className="ref-card-note">
                <h3>Have a referral card?</h3>
                <p>Enter the code from your physical referral card.</p>
                <form onSubmit={handleCardSubmit}>
                  <div className="ref-form-group">
                    <input
                      type="text"
                      className="ref-form-input"
                      value={cardCode}
                      onChange={(e) => {
                        setCardCode(e.target.value);
                        setCardError('');
                      }}
                      placeholder="SNF-XXXXXX"
                    />
                  </div>
                  {cardError && <p className="ref-error">{cardError}</p>}
                  <button type="submit" className="btn btn-outline btn-full">
                    Look Up Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan cards for reference */}
      <section className="ref-plans" id="plans">
        <div className="section-container">
          <h2 className="section-heading">Plans starting at $52/mo.</h2>
          <p className="section-sub">
            Your friend can choose any residential plan. You both get a free month after they&apos;re installed.
          </p>
          <div className="plan-grid">
            {homePreviewPlans.map((plan) => (
              <div key={plan.id} className="plan-card-wrapper">
                <PlanCard plan={{ ...plan, ctaHref: planCtaHref(plan) }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
