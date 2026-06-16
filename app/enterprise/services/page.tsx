import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Enterprise connectivity, security, communications, and video services from SecureNet. Dedicated fiber, managed networks, cameras, access control, and VoIP.',
};

const categories = [
  {
    title: 'Connectivity',
    href: '/enterprise/services/connectivity',
    items: [
      'Network Design & Structured Cabling',
      'Dedicated Internet Access (DIA)',
      'Dedicated Circuits up to 8.5 Gbps',
      'Enterprise Wi-Fi & Hospitality',
      'Point-to-Point & Dark Fiber',
      'BGP & Custom Configurations',
    ],
  },
  {
    title: 'Security',
    href: '/enterprise/services/security',
    items: [
      'IP Camera Systems',
      'Access Control & Biometrics',
      '24/7 Network Monitoring',
      'Endpoint Protection',
    ],
  },
  {
    title: 'Communications',
    href: '/enterprise/services/communications',
    items: [
      'Hosted PBX / VoIP',
      'Auto Attendant & Hunt Groups',
      'Voicemail to Email',
      'Fax to Email',
      'Extension Dialing Across Locations',
    ],
  },
  {
    title: 'Video',
    href: '/enterprise/services/video',
    items: [
      'Bulk Commercial Video (DirecTV)',
      'Hospitality & Waiting Room',
      'Multi-Property Deployments',
    ],
  },
];

export default function ServicesHubPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Services</h1>
          <p className="ent-page-hero-sub">
            Four areas of service, one local provider. Everything runs on our
            own fiber network.
          </p>
        </div>
      </section>

      <section className="ent-section">
        <div className="section-container">
          <div className="ent-services-hub">
            {categories.map((cat) => (
              <div className="ent-hub-card" key={cat.title}>
                <h2>{cat.title}</h2>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={cat.href} className="btn ent-btn-outline">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Not sure what you need?</h2>
            <p>
              Call us and describe your situation. We&rsquo;ll figure out the
              right solution together.
            </p>
            <div className="ent-cta-actions">
              <a href="tel:+13047444667" className="btn ent-btn-primary btn-lg">
                Call (304) 744-4667
              </a>
              <Link href="/enterprise/contact" className="btn ent-btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
