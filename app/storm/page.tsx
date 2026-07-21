import type { Metadata } from 'next';
import CognitoEmbed from '@/components/CognitoEmbed';
import { BreadcrumbSchema } from '@/components/SchemaOrg';
import { getStorm } from '@/lib/storm-store';
import { getStormMessage } from '@/lib/alerts';

export const metadata: Metadata = {
  title: 'Storm Updates & Service Reports',
  description:
    'Report storm damage or service issues to SecureNet Fiber. Check current storm status, troubleshooting steps, and get real-time updates.',
};

export const dynamic = 'force-dynamic';

const phaseVariant: Record<string, string> = {
  monitoring: 'storm-status--warning',
  active: 'storm-status--critical',
  restoring: 'storm-status--warning',
  clear: 'storm-status--clear',
};

const phaseLabel: Record<string, string> = {
  monitoring: 'Weather Advisory',
  active: 'Active Storm',
  restoring: 'Restoration In Progress',
  clear: 'All Clear',
};

export default async function StormPage() {
  const storm = await getStorm();
  const stormForMessage = { enabled: storm.enabled, phase: storm.phase, message: storm.message || undefined };
  const message = getStormMessage(stormForMessage);
  const variant = phaseVariant[storm.phase];
  const label = phaseLabel[storm.phase];

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Storm Updates' }]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Storm Updates &amp; Service Reports</h1>
          <p className="section-sub">
            Report storm damage or service issues, check current status, and find
            troubleshooting steps to get back online.
          </p>
        </div>
      </section>

      {/* Storm Status */}
      {storm.enabled && (
        <section className="storm-status-section">
          <div className="section-container">
            <div className={`storm-status ${variant}`}>
              <div className="storm-status-header">
                <span className="storm-status-dot" />
                <span className="storm-status-label">{label}</span>
              </div>
              <p className="storm-status-message">{message}</p>
            </div>
          </div>
        </section>
      )}

      {/* Damage Report Form */}
      <section className="signup-section">
        <div className="section-container signup-container signup-container--form">
          <div className="signup-form-area">
            <CognitoEmbed formNumber="20" />
          </div>

          <div className="signup-sidebar">
            {/* Troubleshooting */}
            <div className="signup-card">
              <h3>Internet out? Try this first.</h3>
              <ol className="signup-steps">
                <li>
                  <strong>Check your power.</strong> No power means no internet.
                  That&apos;s normal during a power outage.
                </li>
                <li>
                  <strong>Wait 15 minutes</strong> after power returns for your
                  equipment to reconnect automatically.
                </li>
                <li>
                  <strong>Restart your router.</strong> Unplug it, wait 30
                  seconds, and plug it back in.
                </li>
                <li>
                  <strong>Still down?</strong> Submit the form or call us at{' '}
                  <a href="tel:+13047444034">(304) 744-4034</a>.
                </li>
              </ol>
            </div>

            {/* Contact */}
            <div className="signup-card">
              <h3>Need immediate help?</h3>
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
                Monday - Friday, 9 AM - 5 PM
              </p>
            </div>

            {/* Facebook */}
            <div className="signup-card">
              <h3>Follow us for live updates</h3>
              <p>
                During active weather events, we post real-time restoration
                updates on our Facebook page.
              </p>
              <a
                href="https://facebook.com/wvinternet"
                className="storm-fb-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                SecureNet Fiber on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Underground Fiber Note */}
      <section className="storm-fiber-section">
        <div className="section-container" style={{ maxWidth: '740px' }}>
          <h2 className="section-heading">Why fiber holds up better</h2>
          <p className="section-sub">
            Most of our network is underground, so it&apos;s protected from
            wind and falling trees. That doesn&apos;t make it bulletproof, but
            it means fewer weather-related outages than you&apos;d get with
            aerial copper or cable lines.
          </p>
        </div>
      </section>
    </>
  );
}
