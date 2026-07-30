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
        <div className="section-container" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--dark)' }}>
            If you need to reach us sooner, call{' '}
            <a href="tel:+13047444034">(304) 744-4034</a> (WV) or{' '}
            <a href="tel:+14343540101">(434) 354-0101</a> (VA), Monday through
            Friday, 9 AM to 5 PM.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
