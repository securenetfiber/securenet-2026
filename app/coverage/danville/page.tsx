import type { Metadata } from 'next';
import Link from 'next/link';
import AvailabilityCheck from '@/components/AvailabilityCheck';

export const metadata: Metadata = {
  title: 'Fiber Internet in Danville, VA',
  description:
    'SecureNet Fiber is available in Danville, VA. Get fiber internet starting at $52/mo with no contracts, no data caps, and free installation.',
};

export default function DanvillePage() {
  return (
    <>
      {/* Hero */}
      <section className="city-hero">
        <div className="section-container">
          <p className="city-hero-label">Danville, Virginia</p>
          <h1 className="section-heading">Fiber has arrived in Danville.</h1>
          <p className="section-sub">
            SecureNet Fiber is now serving Danville, Virginia. Our first market
            outside West Virginia. We&apos;re building out the network and bringing
            fast, affordable fiber-to-the-home internet to more neighborhoods
            every month. Faster speeds are coming soon.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="city-stats-section">
        <div className="section-container">
          <div className="city-stats">
            <div className="city-stat">
              <span className="city-stat-value">1 Gbps</span>
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
          <h2 className="section-heading">Plans available in Danville</h2>
          <p className="section-sub">
            Every plan includes the same upload and download speeds, no data caps, and no annual
            contracts. Additional tiers are on the way as we expand our Virginia network.
          </p>
          <div className="city-plan-grid city-plan-grid--two">
            <div className="city-plan-card">
              <h3 className="city-plan-speed">500 Mbps</h3>
              <p className="city-plan-price">
                <span className="city-plan-amount">$52</span>/mo
              </p>
              <p className="city-plan-desc">
                Fast, reliable internet for streaming, browsing, and working from home.
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
                Our fastest plan in Danville. Handles a full house of devices
                without breaking a sweat.
              </p>
              <a href="/service-request" className="btn btn-primary">
                Sign Up
              </a>
            </div>
          </div>
          <p className="city-coming-soon">
            Faster speeds coming soon as we continue building out the Danville network.
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
          <h2 className="section-heading">Why Danville is choosing fiber</h2>
          <div className="city-why-grid">
            <div className="city-why-card">
              <h3>Speed that doesn&apos;t slow down</h3>
              <p>
                Cable internet shares bandwidth with your whole neighborhood. When
                everyone logs on after work, speeds tank. Fiber gives you a
                dedicated line. Your speed stays constant.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Real upload speeds</h3>
              <p>
                With cable, uploads crawl. Fiber delivers the same speed up and down, so
                video calls, cloud backups, and uploads work just as fast as
                downloads.
              </p>
            </div>
            <div className="city-why-card">
              <h3>A local provider that picks up the phone</h3>
              <p>
                When you call SecureNet, you talk to a real person nearby. Not a
                call center on the other side of the country. Our Virginia support
                line is <a href="tel:+14343540101">(434) 354-0101</a>.
              </p>
            </div>
            <div className="city-why-card">
              <h3>Growing network, growing speeds</h3>
              <p>
                We&apos;re actively expanding in Danville. As the network grows,
                faster speed tiers will become available. The fiber already
                in your home will support them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-section">
        <div className="section-container">
          <h2 className="section-heading">Ready to get connected?</h2>
          <p className="section-sub">
            Danville&apos;s fiber network is live and growing. Sign up today and
            we&apos;ll schedule your free installation.
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
