import type { Metadata } from 'next';
import Link from 'next/link';
import AvailabilityCheck from '@/components/AvailabilityCheck';

export const metadata: Metadata = {
  title: 'Fiber Internet in Nitro, WV',
  description:
    'SecureNet Fiber is available in Nitro, WV. Get fiber internet starting at $52/mo with no contracts, no data caps, and free installation.',
};

export default function NitroPage() {
  return (
    <>
      {/* Hero */}
      <section className="city-hero">
        <div className="section-container">
          <p className="city-hero-label">Nitro, West Virginia</p>
          <h1 className="section-heading">Real fiber. Finally.</h1>
          <p className="section-sub">
            Nitro deserved better than cable and DSL. Now it has it. SecureNet
            Fiber is live in Nitro with fiber-to-the-home service. Symmetrical
            speeds, no data caps, and none of the slowdowns you&apos;re used to
            during peak hours.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="city-stats-section">
        <div className="section-container">
          <div className="city-stats">
            <div className="city-stat">
              <span className="city-stat-value">5 Gbps</span>
              <span className="city-stat-label">Max speed</span>
            </div>
            <div className="city-stat">
              <span className="city-stat-value">$52/mo</span>
              <span className="city-stat-label">Starting at</span>
            </div>
            <div className="city-stat">
              <span className="city-stat-value">$0</span>
              <span className="city-stat-label">Contracts</span>
            </div>
            <div className="city-stat">
              <span className="city-stat-value">Free</span>
              <span className="city-stat-label">Installation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="city-plans">
        <div className="section-container">
          <h2 className="section-heading">Plans available in Nitro</h2>
          <p className="section-sub">
            Every plan includes symmetrical speeds, no data caps, and no annual contracts.
          </p>
          <div className="city-plan-grid">
            <div className="city-plan-card">
              <h3 className="city-plan-speed">500 Mbps</h3>
              <p className="city-plan-price">
                <span className="city-plan-amount">$52</span>/mo
              </p>
              <p className="city-plan-desc">
                Stream, browse, and work from home without missing a beat.
              </p>
              <a href="/service-request" className="btn btn-primary">
                Sign Up
              </a>
            </div>
            <div className="city-plan-card city-plan-card--popular">
              <span className="city-plan-badge">Most Popular</span>
              <h3 className="city-plan-speed">1 Gig</h3>
              <p className="city-plan-price">
                <span className="city-plan-amount">$72</span>/mo
              </p>
              <p className="city-plan-desc">
                Run a house full of devices at the same time. No buffering, no compromises.
              </p>
              <a href="/service-request" className="btn btn-primary">
                Sign Up
              </a>
            </div>
            <div className="city-plan-card">
              <h3 className="city-plan-speed">2 Gig</h3>
              <p className="city-plan-price">
                <span className="city-plan-amount">$107</span>/mo
              </p>
              <p className="city-plan-desc">
                For large households, home offices, and heavy multitasking.
              </p>
              <a href="/service-request" className="btn btn-primary">
                Sign Up
              </a>
            </div>
          </div>
          <p className="city-plan-more">
            Need more speed? <Link href="/residential">View all plans</Link> including our 5 Gig and 8.5 Gig options.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="city-included-section">
        <div className="section-container">
          <h2 className="section-heading">What&apos;s included with every plan</h2>
          <div className="city-included">
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>No data caps</span>
            </div>
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>No contracts</span>
            </div>
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Free installation</span>
            </div>
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Local support</span>
            </div>
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Wi-Fi router included</span>
            </div>
            <div className="city-included-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Symmetrical speeds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fiber */}
      <section className="city-why">
        <div className="section-container">
          <h2 className="section-heading">Done with cable? Good.</h2>
          <div className="city-why-grid">
            <div className="city-why-card">
              <h3>No more shared bandwidth</h3>
              <p>
                Cable splits bandwidth across your neighborhood. When everyone
                gets home at 6 PM, speeds drop. Fiber gives you a dedicated
                connection. Your speed is your speed.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Upload speeds that actually work</h3>
              <p>
                Cable upload speeds are a joke. Fiber gives you the same speed up
                as down, so video calls, cloud storage, and file sharing work the
                way they should.
              </p>
            </div>
            <div className="city-why-card">
              <h3>No more price hikes</h3>
              <p>
                We keep pricing simple. One price, no promotional rates that
                expire after a year, no bundling requirements, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-section">
        <div className="section-container">
          <h2 className="section-heading">Ready to switch?</h2>
          <p className="section-sub">
            Residents across Nitro are already on SecureNet Fiber. Sign up online
            and we&apos;ll get your installation scheduled.
          </p>
          <div className="city-cta-buttons">
            <a href="/service-request" className="btn btn-primary">
              Sign Up Now
            </a>
            <Link href="/coverage" className="btn btn-ghost">
              View All Coverage Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Availability Check */}
      <AvailabilityCheck />
    </>
  );
}
