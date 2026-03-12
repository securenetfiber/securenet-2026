import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Speed Test',
  description:
    'Test your SecureNet Fiber internet speed. Powered by Ookla Speedtest, hosted on our own network for the most accurate results.',
};

export default function SpeedTestPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Speed Test' }]} />

      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Speed Test</h1>
          <p className="section-sub">
            Test your connection speed directly against the SecureNet Fiber
            network. Powered by Ookla.
          </p>
        </div>
      </section>

      {/* SPEED TEST CTA */}
      <section className="speedtest-section">
        <div className="section-container">
          <div className="speedtest-cta">
            <h2 className="section-heading" style={{ textAlign: 'center' }}>
              Ready to test?
            </h2>
            <p className="section-sub" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'var(--space-lg)' }}>
              Our speed test server is hosted on our network, so you get the most
              accurate measurement of your SecureNet connection.
            </p>
            <div style={{ textAlign: 'center' }}>
              <a
                href="https://securenet.speedtest.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Launch Speed Test
              </a>
            </div>
          </div>

          {/* Iframe attempt — Ookla may block via X-Frame-Options */}
          <div className="speedtest-embed">
            <iframe
              src="https://securenet.speedtest.net"
              title="SecureNet Fiber Speed Test"
              loading="lazy"
              style={{ width: '100%', height: '500px', border: 'none', borderRadius: 'var(--radius-lg)' }}
            />
            <p className="speedtest-embed-fallback">
              If the speed test doesn&apos;t load above, use the button to open
              it in a new tab.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="why-fiber">
        <div className="section-container">
          <h2 className="section-heading">What to expect.</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Speed test results depend on your plan, device, and Wi-Fi setup.
            Here&apos;s a general guide.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
              </div>
              <h3>Expected Speeds by Plan</h3>
              <p>
                <strong>500 Mbps:</strong> ~470 Mbps typical<br />
                <strong>1 Gig:</strong> ~940 Mbps typical<br />
                <strong>5 Gig:</strong> ~4,700 Mbps typical<br />
                Speeds are symmetrical &mdash; upload matches download.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
              </div>
              <h3>Testing Tips</h3>
              <p>
                For the most accurate results, use a wired Ethernet connection.
                Wi-Fi speeds depend on your router, distance, and interference.
                Close other apps and tabs during the test.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </div>
              <h3>Not what you expected?</h3>
              <p>
                If your speeds are consistently lower than expected,{' '}
                <Link href="/contact">contact our support team</Link>. We can
                help troubleshoot your connection, check your router, or schedule
                a service visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NON-CUSTOMER CTA */}
      <section className="availability">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Not a customer yet?</h2>
            <p className="avail-sub">
              See what speeds are available at your address. Fiber internet
              starting at $52/mo with no contracts.
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
