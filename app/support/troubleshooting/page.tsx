import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Troubleshooting',
  description:
    'Fix common internet issues in minutes. Step-by-step guides for connection problems and slow speeds from SecureNet Fiber.',
};

export default function TroubleshootingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Support' },
          { name: 'Troubleshooting' },
        ]}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Troubleshooting</h1>
          <p className="section-sub">
            Most issues can be fixed in a few minutes. Select your issue below
            to get started.
          </p>
        </div>
      </section>

      {/* Jump Nav */}
      <nav className="page-jump-nav" aria-label="Page sections">
        <ul className="jump-nav-list">
          <li><a href="#not-working">Internet Not Working</a></li>
          <li><a href="#slow">Slow Speeds</a></li>
          <li><a href="#help">Still Need Help?</a></li>
        </ul>
      </nav>

      {/* Section A: Internet Not Working */}
      <section className="ts-section" id="not-working">
        <div className="section-container ts-container">
          <h2 className="section-heading">My internet is not working.</h2>
          <p className="section-sub">
            Having trouble connecting? Most connection issues can be fixed in
            just a few minutes with a simple restart of your equipment. Work
            through these steps in order.
          </p>

          <div className="ts-steps">
            {/* Step 1 */}
            <div className="ts-step">
              <div className="ts-step-number">1</div>
              <div className="ts-step-content">
                <h3>Confirm your account is current</h3>
                <p>
                  Our system automatically suspends service when a payment is
                  more than 30 days past due. If you think you may have a
                  past-due balance,{' '}
                  <a
                    href="https://billing.securenetfiber.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    log in to your account portal
                  </a>{' '}
                  to check before continuing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="ts-step">
              <div className="ts-step-number">2</div>
              <div className="ts-step-content">
                <h3>Unplug your modem</h3>
                <p>
                  Find your modem and unplug the power cable from the wall
                  outlet (not just from the back of the device). Your modem
                  will be one of the following:
                </p>
                <div className="ts-equipment">
                  <div className="ts-equipment-item">
                    <img
                      src="/img/2434GN_2.avif"
                      alt="Black DZS modem"
                      width={120}
                      height={120}
                      loading="lazy"
                    />
                    <span>Black DZS modem</span>
                  </div>
                  <div className="ts-equipment-item">
                    <img
                      src="/img/gp1100x.avif"
                      alt="Gray Calix modem"
                      width={120}
                      height={120}
                      loading="lazy"
                    />
                    <span>Gray Calix modem</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="ts-step">
              <div className="ts-step-number">3</div>
              <div className="ts-step-content">
                <h3>Unplug your router</h3>
                <p>
                  Now unplug your router from the wall outlet as well. Your
                  router may be one of the following:
                </p>
                <div className="ts-equipment">
                  <div className="ts-equipment-item">
                    <img
                      src="/img/white-tp-link-smart-routers-deco-w3000-2-pack-64_600.avif"
                      alt="White TP-Link Deco router"
                      width={120}
                      height={120}
                      loading="lazy"
                    />
                    <span>TP-Link Deco (SecureNet)</span>
                  </div>
                  <div className="ts-equipment-item ts-equipment-item--text">
                    <div className="ts-equipment-placeholder">?</div>
                    <span>Your own personal router</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="ts-step">
              <div className="ts-step-number">4</div>
              <div className="ts-step-content">
                <h3>Wait 10 seconds</h3>
                <p>
                  With both devices unplugged, wait a full 10 seconds. This
                  allows the equipment to fully reset and clears any network
                  state that may be causing the issue. Count it out.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="ts-step">
              <div className="ts-step-number">5</div>
              <div className="ts-step-content">
                <h3>Plug the modem back in first</h3>
                <p>
                  Plug the modem back into the wall and <strong>wait 2 to 3
                  minutes</strong> before doing anything else. The modem needs
                  time to reconnect to our network before the router can
                  communicate through it.
                </p>
                <p>
                  Once the modem&apos;s indicator lights have stabilized, plug
                  your router back in and give it another minute or two.
                </p>
              </div>
            </div>
          </div>

          <div className="ts-result-card ts-result-card--success">
            <h3>That&apos;s it!</h3>
            <p>
              You should be back online. The large majority of connection
              issues are resolved with this restart. Your speeds may even be
              better than before.
            </p>
          </div>
        </div>
      </section>

      {/* Section B: Slow Speeds */}
      <section className="ts-section ts-section--alt" id="slow">
        <div className="section-container ts-container">
          <h2 className="section-heading">My internet is slow.</h2>
          <p className="section-sub">
            Experiencing slow speeds? Before anything else, there&apos;s one
            thing that resolves the majority of slow speed complaints.
          </p>

          <div className="ts-steps">
            <div className="ts-step">
              <div className="ts-step-number">1</div>
              <div className="ts-step-content">
                <h3>Check your payment status first</h3>
                <p>
                  Our system automatically reduces internet speeds when an
                  invoice is <strong>15 or more days past due</strong>. This is
                  by far the most common cause of sudden slow speeds.
                </p>
                <p>
                  <a
                    href="https://billing.securenetfiber.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Log into your account
                  </a>{' '}
                  to confirm your payment status. If a payment is outstanding,
                  completing it will restore your full speeds, typically within
                  minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="ts-result-card">
            <h3>Still slow after confirming payment?</h3>
            <p>
              <Link href="/contact">Contact our support team</Link> and please
              include: what speeds you&apos;re seeing, what device you&apos;re
              using, whether it&apos;s on Wi-Fi or wired, and roughly when it
              started.
            </p>
          </div>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="availability" id="help">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Still need help?</h2>
            <p className="avail-sub">
              If you&apos;ve worked through the steps above and are still
              having trouble, our support team is here for you.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Contact Support
              </Link>
              <a
                href="tel:+13047444034"
                className="btn btn-ghost"
                style={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Call (304) 744-4034
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
