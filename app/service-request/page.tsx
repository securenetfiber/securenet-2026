import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Sign Up for Service',
  description:
    'Sign up for SecureNet Fiber internet. Fast, reliable fiber-to-the-home starting at $52/mo with no contracts and no data caps.',
};

export default function ServiceRequestPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Sign Up' }]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Sign Up for SecureNet Fiber</h1>
          <p className="section-sub">
            Ready to make the switch? Get started with fiber internet today.
          </p>
        </div>
      </section>

      {/* Sign Up Content */}
      <section className="signup-section">
        <div className="section-container signup-container">
          <div className="signup-card">
            <h2 className="section-heading">What to expect</h2>
            <ol className="signup-steps">
              <li>Choose your plan (500 Mbps, 1 Gig, or 5 Gig)</li>
              <li>We verify service availability at your address</li>
              <li>Schedule your free installation</li>
              <li>Outside fiber drop installed (usually the day before)</li>
              <li>In-home setup takes about 60 to 90 minutes</li>
            </ol>
          </div>

          <div className="signup-card">
            <h2 className="section-heading">Get in touch to sign up</h2>
            <p>
              Give us a call and our team will walk you through plan options,
              confirm availability at your address, and get your installation
              scheduled.
            </p>
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
            <p className="signup-hours">
              Monday &ndash; Friday, 9 AM &ndash; 5 PM
            </p>
          </div>

          <div className="signup-actions">
            <Link href="/residential" className="btn btn-primary">
              View Plans
            </Link>
            <Link href="/coverage" className="btn btn-outline">
              Check Coverage
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
