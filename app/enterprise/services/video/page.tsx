import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Commercial video services from SecureNet. Bulk DirecTV for hospitality, waiting rooms, and commercial properties.',
};

export default function VideoPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Video</h1>
          <p className="ent-page-hero-sub">
            Bulk commercial video for hotels, waiting rooms, and
            commercial properties.
          </p>
        </div>
      </section>

      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Commercial Video Services</h2>
          <p className="ent-section-sub">
            We deploy and manage DirecTV service at scale for commercial
            properties. One provider, one bill, one team to call.
          </p>
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Hospitality</h3>
              <p>
                Hotel and resort video packages with property-wide distribution,
                channel lineup management, and on-site service.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Waiting Rooms &amp; Lobbies</h3>
              <p>
                Video service for medical offices, auto dealers, and any business
                that needs TV in a customer-facing space.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Multi-Property</h3>
              <p>
                Manage video across multiple locations from a single account.
                Consistent service, centralized billing.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Bars &amp; Restaurants</h3>
              <p>
                Commercial video packages with sports and entertainment lineups
                designed for public viewing environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Need commercial video?</h2>
            <p>Call us to discuss video packages for your property or locations.</p>
            <div className="ent-cta-actions">
              <a href="tel:+13042050600" className="btn ent-btn-primary btn-lg">Call (304) 205-0600</a>
              <Link href="/enterprise/contact" className="btn ent-btn-outline btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
