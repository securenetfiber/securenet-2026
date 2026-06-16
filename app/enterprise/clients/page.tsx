import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Who We Work With',
  description:
    'SecureNet Enterprise serves commercial operations across the Kanawha Valley and Danville, VA. Hotels, hospitals, offices, and multi-location businesses.',
};

const sectors = [
  {
    title: 'Healthcare',
    desc: 'HIPAA-aware networking, secure connectivity between locations, and reliable uptime for systems that can\'t go down.',
  },
  {
    title: 'Hospitality',
    desc: 'Property-wide Wi-Fi, in-room internet, video distribution, and front-desk phone systems for hotels and resorts.',
  },
  {
    title: 'Professional Offices',
    desc: 'Law firms, accounting offices, and corporate suites with managed networking, VoIP, and security.',
  },
  {
    title: 'Government &amp; Education',
    desc: 'Dedicated circuits, managed firewalls, and network monitoring for public sector organizations.',
  },
  {
    title: 'Retail &amp; Restaurants',
    desc: 'POS connectivity, guest Wi-Fi, camera systems, and commercial video for customer-facing businesses.',
  },
  {
    title: 'Multi-Location',
    desc: 'Site-to-site connectivity, centralized management, and consistent service across all your locations.',
  },
];

export default function ClientsPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Who we work with.</h1>
          <p className="ent-page-hero-sub">
            Commercial operations across the Kanawha Valley and Danville, VA.
            From single-site offices to multi-location enterprises.
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Industries we serve.</h2>
          <div className="ent-benefit-grid ent-benefit-grid--3">
            {sectors.map((s) => (
              <div className="ent-benefit-card" key={s.title}>
                <h3 dangerouslySetInnerHTML={{ __html: s.title }} />
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Ready to talk?</h2>
            <p>Tell us about your operation and we&rsquo;ll show you what we can do.</p>
            <div className="ent-cta-actions">
              <a href="tel:+13047444667" className="btn ent-btn-primary btn-lg">Call (304) 744-4667</a>
              <Link href="/enterprise/contact" className="btn ent-btn-outline btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
