import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Request Received',
  description:
    'Your service request has been received. A SecureNet team member will contact you within one business day.',
};

export default function ThankYouPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Sign Up', href: '/service-request' },
          { name: 'Thank You' },
        ]}
      />

      <Script id="gtag-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', {
  'send_to': 'AW-18360544898/mTprCMSXidkcEILd_rJE',
  'value': 1.0,
  'currency': 'USD'
});`}
      </Script>

      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">We Got Your Request</h1>
          <p className="section-sub">
            A member of our team will call you within one business day to confirm
            your plan, verify availability, and schedule your installation.
          </p>
        </div>
      </section>

      <section className="signup-section">
        <div className="section-container signup-container signup-container--form">
          <div className="signup-form-area" style={{ maxWidth: '640px' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Ready to pick your install date?</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--dark)' }}>
              If you already know when works best, go ahead and schedule your
              installation now. Otherwise, sit tight &mdash; we&apos;ll be in
              touch within one business day.
            </p>
            <a
              href="https://calendly.com/securenetoperations"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Installation
            </a>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

            <h3 style={{ marginBottom: '0.75rem' }}>What happens next</h3>
            <ol className="signup-steps">
              <li>Check your email for a confirmation with your request details</li>
              <li>We&apos;ll call to confirm your plan and verify availability</li>
              <li>Your fiber drop gets installed (usually the day before)</li>
              <li>In-home setup takes about 60 to 90 minutes</li>
            </ol>
          </div>

          <div className="signup-sidebar">
            <div className="signup-card">
              <h3>Prefer to call?</h3>
              <div className="signup-phones">
                <div className="signup-phone">
                  <strong>West Virginia</strong>
                  <a href="tel:+13047444034">(304) 744-4034</a>
                </div>
                <div className="signup-phone">
                  <strong>Virginia</strong>
                  <a href="tel:+14343540101">(434) 354-0101</a>
                </div>
              </div>
              <p className="signup-hours">Monday &ndash; Friday, 9 AM &ndash; 5 PM</p>
            </div>
          </div>
        </div>

        <div className="section-container" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <Link href="/" className="btn btn-primary" style={{ background: 'var(--navy)' }}>
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
