import type { Metadata } from 'next';
import Link from 'next/link';
import AvailabilityCheck from '@/components/AvailabilityCheck';
import NetworkPerformance from '@/components/NetworkPerformance';

export const metadata: Metadata = {
  title: 'Coverage Areas',
  description:
    'SecureNet Fiber service areas in the Kanawha Valley, WV and Danville, VA. Check if fiber internet is available at your address.',
};

export default function CoveragePage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Where We Are</h1>
          <p className="section-sub">
            We&apos;re actively building and expanding our fiber network. Here&apos;s
            where SecureNet Fiber is available today and where we&apos;re headed
            next.
          </p>
        </div>
      </section>

      {/* KANAWHA VALLEY */}
      <section className="market-area">
        <div className="section-container">
          <div className="market-card">
            <div className="market-info">
              <h2 className="section-heading">Kanawha Valley, WV</h2>
              <p className="market-description">
                Our home market and where it all started. SecureNet Fiber is
                available today in South Charleston, Nitro, and Dunbar, with
                active construction underway in St. Albans. We&apos;re bringing
                fiber-to-the-home to more neighborhoods every month.
              </p>
              <div className="market-speeds">
                <h3>Available Speeds</h3>
                <ul>
                  <li><strong>500 Mbps</strong> starting at $52/mo</li>
                  <li><strong>1 Gbps</strong> starting at $72/mo</li>
                  <li><strong>5 Gbps</strong> starting at $152/mo</li>
                </ul>
              </div>
              <div className="market-cities">
                <h3>Service Areas</h3>
                <ul>
                  <li><Link href="/coverage/south-charleston">South Charleston</Link> <span className="market-status market-status--live">Available Now</span></li>
                  <li><Link href="/coverage/nitro">Nitro</Link> <span className="market-status market-status--live">Available Now</span></li>
                  <li><Link href="/coverage/dunbar">Dunbar</Link> <span className="market-status market-status--live">Available Now</span></li>
                  <li><Link href="/coverage/st-albans">St. Albans</Link> <span className="market-status market-status--expanding">Expanding</span></li>
                </ul>
              </div>
              <a href="/service-request" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Check Your Address
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DANVILLE, VA */}
      <section className="market-area market-area--alt">
        <div className="section-container">
          <div className="market-card">
            <div className="market-info">
              <h2 className="section-heading">Danville, VA</h2>
              <p className="market-description">
                SecureNet Fiber is now serving Danville, Virginia. We currently
                offer 500 Mbps and 1 Gig plans, with faster speeds on the way as
                we continue to build out the network.
              </p>
              <div className="market-speeds">
                <h3>Available Speeds</h3>
                <ul>
                  <li><strong>500 Mbps</strong> starting at $52/mo</li>
                  <li><strong>1 Gbps</strong> starting at $72/mo</li>
                  <li><strong>Faster speeds</strong> coming soon</li>
                </ul>
              </div>
              <div className="market-cities">
                <h3>Service Areas</h3>
                <ul>
                  <li><Link href="/coverage/danville">Danville</Link> <span className="market-status market-status--live">Available Now</span></li>
                </ul>
              </div>
              <a href="/service-request" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Check Your Address
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK PERFORMANCE */}
      <NetworkPerformance />

      {/* AVAILABILITY CHECK */}
      <AvailabilityCheck />
    </>
  );
}
