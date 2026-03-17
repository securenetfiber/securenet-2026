import type { Metadata } from 'next';
import PreRegForm from '@/components/PreRegForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fiber Internet Coming to St. Albans, WV',
  description:
    'SecureNet Fiber is expanding to St. Albans, WV. Pre-register today to be first in line when service goes live.',
};

export default function StAlbansPage() {
  return (
    <>
      {/* HERO */}
      <section className="prereg-hero">
        <div className="section-container">
          <span className="prereg-badge">Coming Soon</span>
          <h1 className="section-heading">Fiber is coming to St. Albans.</h1>
          <p className="section-sub">
            We&apos;re actively building our fiber network in St. Albans, WV.
            Pre-register today to be first in line when service goes live in your neighborhood.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="prereg-timeline">
        <div className="section-container">
          <h2 className="section-heading">Build Progress</h2>
          <div className="prereg-steps">
            <div className="prereg-step prereg-step--complete">
              <div className="prereg-step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3>Network Design</h3>
              <p>Complete</p>
            </div>
            <div className="prereg-step prereg-step--active">
              <div className="prereg-step-icon">2</div>
              <h3>Construction Underway</h3>
              <p>In progress</p>
            </div>
            <div className="prereg-step prereg-step--upcoming">
              <div className="prereg-step-icon">3</div>
              <h3>Connecting Homes</h3>
              <p>Coming soon</p>
            </div>
            <div className="prereg-step prereg-step--upcoming">
              <div className="prereg-step-icon">4</div>
              <h3>Service Goes Live</h3>
              <p>Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="prereg-expect">
        <div className="section-container">
          <h2 className="section-heading">What to Expect</h2>
          <p className="section-sub">
            When fiber reaches your neighborhood, here&apos;s what you&apos;ll get.
          </p>
          <div className="prereg-expect-grid">
            <div className="prereg-expect-item">
              <div className="prereg-expect-value">$52</div>
              <h3>Plans starting at $52/mo</h3>
              <p>Affordable fiber internet with no surprises on your bill.</p>
            </div>
            <div className="prereg-expect-item">
              <div className="prereg-expect-value">5 Gbps</div>
              <h3>Speeds up to 5 Gbps</h3>
              <p>Symmetrical upload and download. Fast in both directions.</p>
            </div>
            <div className="prereg-expect-item">
              <div className="prereg-expect-value">None</div>
              <h3>No contracts, no data caps</h3>
              <p>Month-to-month service. Use as much data as you want.</p>
            </div>
            <div className="prereg-expect-item">
              <div className="prereg-expect-value">Free</div>
              <h3>Free installation</h3>
              <p>Professional install at no cost. Fiber drop and indoor setup included.</p>
            </div>
            <div className="prereg-expect-item">
              <div className="prereg-expect-value">Included</div>
              <h3>Wi-Fi router included</h3>
              <p>We provide a managed router so you&apos;re connected out of the box.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-REGISTRATION FORM */}
      <section className="prereg-form-section">
        <div className="section-container">
          <h2 className="section-heading">Get in Line</h2>
          <p className="section-sub">
            Pre-register now and we&apos;ll contact you as soon as service is available
            at your address. No commitment required.
          </p>
          <div className="prereg-form-wrapper">
            <PreRegForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="prereg-faq">
        <div className="section-container">
          <h2 className="section-heading">Common Questions</h2>
          <div className="prereg-faq-list">
            <div className="prereg-faq-item">
              <h3>When will fiber be available in St. Albans?</h3>
              <p>
                Construction is actively underway. We&apos;re connecting neighborhoods
                as we go and expect to begin service in the coming months.
              </p>
            </div>
            <div className="prereg-faq-item">
              <h3>Does pre-registering commit me to anything?</h3>
              <p>
                No. Pre-registering just puts you on our list so we can reach out
                when service is available at your address.
              </p>
            </div>
            <div className="prereg-faq-item">
              <h3>What will installation look like?</h3>
              <p>
                Installation is two parts: an outside fiber drop (done about a day before),
                then an indoor install of the NID/ONT and router setup, which takes about
                60-90 minutes. Installation is free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-section">
        <div className="section-container">
          <h2 className="section-heading">Want to learn more?</h2>
          <p className="section-sub">
            Check out our full plan details or see where else we&apos;re available.
          </p>
          <div className="city-cta-buttons">
            <Link href="/residential" className="btn btn-primary">
              View Plans
            </Link>
            <Link href="/coverage" className="btn btn-outline">
              Coverage Areas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
