import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Data Center & Colocation Services',
  description:
    'Colocation and rack space at our South Charleston, WV data center. Redundant power, backup generators, 24/7 security, and fiber connectivity with 99.99% uptime.',
};

export default function DataCenterServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Business', href: '/business' },
          { name: 'Data Center Services' },
        ]}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Data Center &amp; Colocation</h1>
          <p className="section-sub">
            Safeguard your business-critical infrastructure at our South
            Charleston, WV data center with 99.99% network uptime.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="included">
        <div className="section-container">
          <h2 className="section-heading">A local data center solution.</h2>
          <p className="section-sub">
            Protect your valuable data right here in the Kanawha Valley. We
            provide a scalable, high-performance environment for your
            business-critical IT infrastructure with direct fiber connectivity
            to our network backbone.
          </p>

          <div className="included-grid">
            {[
              {
                title: 'Flexible Space',
                desc: 'Partial rack space and full cabinet options available. Scale up as your needs grow without relocating your equipment.',
              },
              {
                title: 'Multi-Carrier Connectivity',
                desc: 'Flexible bandwidth connections to multiple carriers. Your infrastructure stays connected through diverse fiber paths.',
              },
              {
                title: 'Redundant Power',
                desc: 'Dual power feeds with on-site backup generators. Your equipment stays online through outages and utility interruptions.',
              },
              {
                title: 'Remote Hands Support',
                desc: 'Our on-site team can handle physical tasks on your behalf. Reboots, cable swaps, and visual checks without a site visit.',
              },
              {
                title: '24/7 Security',
                desc: 'Around-the-clock security with access control systems. Your equipment is monitored and protected at all times.',
              },
              {
                title: 'Local Staff',
                desc: 'Responsive support from people who are actually here. No tickets disappearing into a national NOC. We pick up the phone.',
              },
            ].map((item) => (
              <div className="included-item" key={item.title}>
                <div className="included-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="availability">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Let&apos;s talk about your infrastructure.</h2>
            <p className="avail-sub">
              We&apos;ll meet with you to audit your current data center costs and
              find ways to reduce overhead while increasing reliability.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/service-request" className="btn btn-primary">
                Request a Quote
              </Link>
              <Link href="/contact" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.3)' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
