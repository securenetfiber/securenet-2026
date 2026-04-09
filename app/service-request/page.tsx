import type { Metadata } from 'next';
import CognitoEmbed from '@/components/CognitoEmbed';
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
            Fill out the form below and we&apos;ll call you within one business
            day to confirm your plan, verify availability, and schedule
            installation.
          </p>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="signup-section">
        <div className="section-container signup-container signup-container--form">
          <div className="signup-form-area">
            <CognitoEmbed formNumber="22" />
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
              <p className="signup-hours">
                Monday &ndash; Friday, 9 AM &ndash; 5 PM
              </p>
            </div>
            <div className="signup-card">
              <h3>What to expect</h3>
              <ol className="signup-steps">
                <li>We confirm your plan and availability</li>
                <li>Schedule your free installation</li>
                <li>Fiber drop installed (usually the day before)</li>
                <li>In-home setup takes 60 to 90 minutes</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
