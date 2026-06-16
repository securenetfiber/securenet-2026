import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Fiber & Managed Services',
  description:
    'Enterprise fiber internet, managed networks, business security, and VoIP from SecureNet. Dedicated circuits up to 8.5 Gbps, local support.',
};

const serviceCategories = [
  {
    title: 'Connectivity',
    desc: 'Dedicated fiber circuits up to 8.5 Gbps, DIA, network design, structured cabling, and enterprise Wi-Fi.',
    href: '/enterprise/services/connectivity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Security',
    desc: 'IP camera systems, access control, endpoint protection, and 24/7 network monitoring.',
    href: '/enterprise/services/security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Communications',
    desc: 'Hosted PBX, auto attendant, voicemail to email, hunt groups, and extension dialing across locations.',
    href: '/enterprise/services/communications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Video',
    desc: 'Bulk commercial video services for hospitality, waiting rooms, and commercial properties.',
    href: '/enterprise/services/video',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <rect x="2" y="7" width="15" height="10" rx="2" ry="2" />
        <polygon points="23 7 17 12 23 17 23 7" />
      </svg>
    ),
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="ent-hero">
        <div className="section-container">
          <p className="ent-hero-eyebrow">SecureNet Enterprise</p>
          <h1 className="ent-hero-heading">
            Enterprise fiber.<br />
            Local team.
          </h1>
          <p className="ent-hero-sub">
            Dedicated internet, managed networks, and business security for
            commercial operations in the Kanawha Valley and Danville, VA. Built
            on our fiber network, backed by people you can actually talk to.
          </p>
          <div className="ent-hero-cta">
            <a href="tel:+13047444667" className="btn ent-btn-primary btn-lg">
              Call (304) 744-4667
            </a>
            <Link href="/enterprise/contact" className="btn ent-btn-outline btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">What we do.</h2>
          <p className="ent-section-sub">
            Four areas of service, one local provider. Every solution runs on
            our own fiber network.
          </p>

          <div className="ent-card-grid">
            {serviceCategories.map((cat) => (
              <Link href={cat.href} key={cat.title} className="ent-service-card">
                <div className="ent-service-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span className="ent-card-arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fiber callout */}
      <section className="ent-callout">
        <div className="section-container">
          <div className="ent-callout-inner">
            <h2>&ldquo;Fiber powered&rdquo; doesn&rsquo;t mean real fiber.</h2>
            <p>
              Some providers run fiber to a neighborhood node and then switch to
              copper for the last mile. That bottleneck kills your upload speeds
              and reliability. SecureNet runs fiber directly to your building.
              Same speed up and down, no shared lines, no excuses.
            </p>
          </div>
        </div>
      </section>

      {/* Why SecureNet (brief) */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Why SecureNet.</h2>
          <div className="ent-benefit-grid">
            {[
              {
                title: 'Local Support',
                desc: 'When you call, you get someone in the valley. No phone trees, no overseas call centers.',
              },
              {
                title: 'One Provider',
                desc: 'Internet, phone, networking, security, and video from one team that knows your setup.',
              },
              {
                title: 'Flexible Terms',
                desc: 'Service agreements built around your operation, not the other way around.',
              },
              {
                title: 'Deep Experience',
                desc: 'Our team brings decades of combined experience building and managing networks in this valley.',
              },
            ].map((item) => (
              <div className="ent-benefit-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Let&rsquo;s talk about your operation.</h2>
            <p>
              Tell us what you need. Our commercial team will scope a custom
              solution and get back to you within one business day.
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
