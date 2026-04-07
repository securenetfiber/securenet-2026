import type { Metadata } from 'next';
import Link from 'next/link';
import AvailabilityCheck from '@/components/AvailabilityCheck';

export const metadata: Metadata = {
  title: 'Fiber Internet in South Charleston, WV',
  description:
    'SecureNet Fiber is available in South Charleston, WV. Get fiber internet starting at $52/mo with no contracts, no data caps, and free installation.',
};

export default function SouthCharlestonPage() {
  return (
    <>
      {/* Hero */}
      <section className="city-hero">
        <div className="section-container">
          <p className="city-hero-label">South Charleston, West Virginia</p>
          <h1 className="section-heading">Where SecureNet started.</h1>
          <p className="section-sub">
            South Charleston is our home. It&apos;s where we built our first fiber
            line, hired our first crew, and connected our first customer. Today,
            fiber-to-the-home service is live across the city, and we&apos;re
            still growing.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="city-stats-section">
        <div className="section-container">
          <div className="city-stats">
            <div className="city-stat">
              <span className="city-stat-value">8.5 Gbps</span>
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
          <h2 className="section-heading">Plans available in South Charleston</h2>
          <p className="section-sub">
            Every plan includes the same upload and download speeds, no data caps, and no annual contracts.
          </p>
          <div className="city-plan-grid">
            <div className="city-plan-card">
              <h3 className="city-plan-speed">500 Mbps</h3>
              <p className="city-plan-price">
                <span className="city-plan-amount">$52</span>/mo
              </p>
              <p className="city-plan-desc">
                Plenty fast for streaming, video calls, and working from home.
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
                Our most popular plan. Handle a full house of devices with ease.
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
              <span>Same speed up &amp; down</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fiber */}
      <section className="city-why">
        <div className="section-container">
          <h2 className="section-heading">Why fiber over cable or DSL?</h2>
          <div className="city-why-grid">
            <div className="city-why-card">
              <h3>No peak-hour slowdowns</h3>
              <p>
                Cable networks get congested when everyone comes home and gets online.
                Fiber doesn&apos;t share bandwidth with your neighbors, so your speed
                stays consistent all day.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Same upload speed as download</h3>
              <p>
                With cable, your upload speed is a fraction of your download. Fiber
                gives you the same speed in both directions. Better for video calls,
                cloud backups, and working from home.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Lower latency</h3>
              <p>
                Fiber has less lag than cable or DSL. That means faster response times
                for gaming, video conferencing, and everything in between.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Future-proof infrastructure</h3>
              <p>
                The fiber running to your home can handle speeds far beyond what we
                offer today. Your connection is ready for whatever comes next.
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
            Join your neighbors in South Charleston who already made the move to fiber.
            Sign up takes just a few minutes.
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
