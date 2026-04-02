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
      <section className="contact">
        <div className="section-container">
          <div className="contact-grid">
            {/* Left: Info */}
            <div className="contact-info">
              <h2 className="section-heading">Get connected.</h2>
              <p>
                Give us a call to sign up for service. Our team will walk you through
                plan options, check availability at your address, and schedule your
                installation.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>West Virginia</strong>
                  <a href="tel:+13047444034">(304) 744-4034</a>
                </div>
                <div className="contact-method">
                  <strong>Virginia</strong>
                  <a href="tel:+14343540101">(434) 354-0101</a>
                </div>
                <div className="contact-method">
                  <strong>Email</strong>
                  <a href="mailto:info@securenetfiber.com">info@securenetfiber.com</a>
                </div>
                <div className="contact-method">
                  <strong>Office Hours</strong>
                  <span>Monday &ndash; Friday, 9 AM &ndash; 5 PM</span>
                </div>
              </div>
              <p style={{ marginTop: '1.5rem' }}>
                Have a question first?{' '}
                <Link href="/contact">Send us a message</Link> or check out
                our <Link href="/faq">FAQ</Link>.
              </p>
            </div>

            {/* Right: Placeholder for Cognito form */}
            <div className="contact-form-wrapper">
              <div className="form-card">
                <h3 style={{ marginBottom: '0.5rem' }}>What to expect</h3>
                <ul className="plan-features" style={{ marginBottom: '1.5rem' }}>
                  <li>Choose your plan (500 Mbps, 1 Gig, or 5 Gig)</li>
                  <li>We verify service availability at your address</li>
                  <li>Schedule your free installation</li>
                  <li>Outside fiber drop installed (usually the day before)</li>
                  <li>In-home setup takes about 60 to 90 minutes</li>
                </ul>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/residential" className="btn btn-primary">
                    View Plans
                  </Link>
                  <Link href="/coverage" className="btn btn-outline">
                    Check Coverage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
