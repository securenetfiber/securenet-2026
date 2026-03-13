import type { Metadata } from 'next';
import Link from 'next/link';
import SpeedComparison from '@/components/SpeedComparison';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Speed Comparison',
  description:
    'See how SecureNet Fiber stacks up against cable and DSL providers. Symmetrical speeds, no data caps, and lower latency.',
};

export default function SpeedComparisonPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Speed Comparison' }]} />

      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Speed Comparison</h1>
          <p className="section-sub">
            Symmetrical upload and download, no fine print. See how fiber
            compares to cable and DSL in our service areas.
          </p>
        </div>
      </section>

      <section className="sc-section">
        <div className="section-container">
          <SpeedComparison />
        </div>
      </section>

      <section className="why-fiber">
        <div className="section-container">
          <h2 className="section-heading">Why the difference matters.</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Real-world performance comes down to more than just download speed.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
              </div>
              <h3>Symmetrical speeds</h3>
              <p>
                Cable upload speeds are often 10&ndash;20x slower than download.
                With fiber, upload matches download — critical for video calls,
                cloud backups, and working from home.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3>Lower latency</h3>
              <p>
                Fiber delivers sub-5ms latency vs. 20&ndash;50ms on cable and DSL.
                That means snappier browsing, smoother gaming, and more
                responsive video calls.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>No data caps</h3>
              <p>
                Many cable plans throttle or cap your data. Every SecureNet plan
                is truly unlimited — stream, game, and download without worrying
                about hitting a limit.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
              </div>
              <h3>No peak-hour slowdowns</h3>
              <p>
                Cable networks share bandwidth between neighbors, so speeds drop
                at peak times. Fiber is a dedicated line to your home — consistent
                speeds 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="availability">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Ready to switch?</h2>
            <p className="avail-sub">
              Fiber internet starting at $52/mo with no contracts. Check
              availability at your address.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/residential" className="btn btn-primary">
                View Plans
              </Link>
              <Link href="/coverage" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                Check Coverage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
