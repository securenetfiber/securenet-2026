import Link from 'next/link';
import PlanCard from '@/components/PlanCard';
import AvailabilityCheck from '@/components/AvailabilityCheck';
import { homePreviewPlans } from '@/lib/plans';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-heading">
            Internet that actually<br />
            <em>works.</em>
          </h1>
          <p className="hero-sub">
            Fiber-to-the-home with speeds up to 5 Gbps. No contracts.
            No hidden fees. Starting at $52/mo.
          </p>
          <div className="hero-cta">
            <a href="#check" className="btn btn-primary btn-lg">Check Your Address</a>
            <Link href="/residential/" className="btn btn-ghost btn-lg">View Plans</Link>
          </div>
          <div className="hero-proof">
            <div className="proof-item">
              <strong>Up to 5 Gbps</strong>
              <span>Fiber-to-the-Home</span>
            </div>
            <div className="proof-divider"></div>
            <div className="proof-item">
              <strong>$52/mo</strong>
              <span>Starting Price</span>
            </div>
            <div className="proof-divider"></div>
            <div className="proof-item">
              <strong>No Contracts</strong>
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN PREVIEW */}
      <section className="plans" id="plans">
        <div className="section-container">
          <h2 className="section-heading">Pick your speed.</h2>
          <p className="section-sub">
            Fiber-to-the-home starting at $52/mo. No contracts, no hidden fees.
          </p>

          <div className="plan-grid">
            {homePreviewPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="plans-note">
            All prices are monthly. No contracts. No hidden fees.{' '}
            <Link href="/residential/">See full plan details.</Link>
          </p>
        </div>
      </section>

      {/* AVAILABILITY CHECK */}
      <AvailabilityCheck />

      {/* ABOUT BLURB */}
      <section className="about" id="about">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-heading">
                A local company<br />with a local mission.
              </h2>
              <p>
                Founded in 2015 in South Charleston, WV, SecureNet grew out of
                the belief that the Kanawha Valley deserved better internet.
                Every one of our employees lives in the communities we serve.
              </p>
              <Link
                href="/about"
                className="btn btn-ghost"
                style={{ marginTop: '1.5rem' }}
              >
                Learn More About Us
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Network Uptime</span>
              </div>
              <div className="stat">
                <span className="stat-number">&lt;30s</span>
                <span className="stat-label">Avg. Support Answer Time</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
