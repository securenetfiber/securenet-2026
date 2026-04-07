import type { Metadata } from 'next';
import Link from 'next/link';
import PlanCardWithLabel from '@/components/PlanCardWithLabel';
import { PlanSchema, BreadcrumbSchema } from '@/components/SchemaOrg';
import { businessPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Business Internet',
  description:
    'Dedicated fiber internet for small businesses in the Kanawha Valley, WV and Danville, VA. Same upload and download speeds, no data caps, no contracts.',
};

// Small business page shows only the lower tiers. Higher tiers and managed
// services live on /business/managed-services.
const smallBusinessPlans = businessPlans.filter((p) =>
  ['biz-500', 'biz-1g', 'biz-2g'].includes(p.id)
);

export default function BusinessPage() {
  return (
    <>
      <PlanSchema plans={smallBusinessPlans} />
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Business' }]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Business Internet</h1>
          <p className="section-sub">
            Dedicated fiber for small businesses in the Kanawha Valley and
            Danville, VA. Same upload and download speeds, no data caps, no contracts.
          </p>
        </div>
      </section>

      {/* Jump Nav */}
      <nav className="page-jump-nav" aria-label="Page sections">
        <ul className="jump-nav-list">
          <li><a href="#internet">Internet Plans</a></li>
          <li><a href="#phone">Business Phone</a></li>
          <li><a href="#services">Managed Services</a></li>
          <li><a href="#why">Why SecureNet</a></li>
          <li><a href="#quote">Get a Quote</a></li>
        </ul>
      </nav>

      {/* BUSINESS INTERNET PLANS */}
      <section className="plans" id="internet">
        <div className="section-container">
          <h2 className="section-heading">Small Business Internet</h2>
          <p className="section-sub">
            Three plans built for offices, retail, and small operations.
          </p>

          <div className="plan-grid">
            {smallBusinessPlans.map((plan) => (
              <PlanCardWithLabel key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="plans-note">
            Need more bandwidth, dedicated internet access, or a service level
            agreement?{' '}
            <Link href="/business/managed-services">
              See our commercial and managed services
            </Link>
            .
          </p>
        </div>
      </section>

      {/* BUSINESS PHONE */}
      <section className="why-fiber" id="phone">
        <div className="section-container">
          <h2 className="section-heading">Business Phone</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Hosted Voice service built on our fiber network. Crystal-clear
            calls, no old-school phone company overhead.
          </p>

          <div className="benefit-grid">
            {[
              {
                title: 'Unlimited Calling',
                desc: 'Unlimited local and long-distance calling included with every line. No per-minute charges, no surprise bills at the end of the month.',
              },
              {
                title: 'Auto Attendant',
                desc: 'Greet callers with a professional menu system. Route calls to the right department or person automatically, day or night.',
              },
              {
                title: 'Voicemail to Email',
                desc: 'Every voicemail gets delivered straight to your inbox as an audio file. Listen to messages from anywhere without dialing in.',
              },
              {
                title: 'Fax to Email',
                desc: 'Receive faxes as email attachments. No fax machine needed, no paper jams, no dedicated phone line.',
              },
              {
                title: 'Hunt Groups',
                desc: 'Ring multiple phones at once or in sequence until someone picks up. Make sure your customers always reach a real person.',
              },
              {
                title: 'Extension Dialing',
                desc: 'Dial between offices and locations using short extensions. Works across all your SecureNet locations as if they were one building.',
              },
            ].map((item) => (
              <div className="benefit-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="plans-note">
            Business Phone pricing depends on your setup and number of lines.{' '}
            <Link href="/service-request">Request a quote</Link> and we&apos;ll
            put together a plan that fits.
          </p>
        </div>
      </section>

      {/* MORE SERVICES (link out to MSP page) */}
      <section className="msp-banner" id="services">
        <div className="section-container">
          <div className="msp-banner-inner">
            <div className="msp-banner-text">
              <p className="msp-banner-eyebrow">Commercial &amp; Managed Services</p>
              <h2>Need more than internet?</h2>
              <p>
                Dedicated fiber up to 8.5 Gbps, DIA, SLA-backed uptime,
                managed networks, business security, and colocation.
              </p>
            </div>
            <Link href="/business/managed-services" className="btn btn-primary btn-lg">
              Explore Commercial Services
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SECURENET */}
      <section className="why-fiber" id="why">
        <div className="section-container">
          <h2 className="section-heading">Why businesses choose SecureNet.</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            We&apos;re not a national carrier with a 1-800 number. We&apos;re your
            neighbors.
          </p>

          <div className="benefit-grid">
            {[
              {
                title: 'Local Support, Real People',
                desc: 'When you call us, you get someone who lives in the valley. No phone trees, no overseas call centers. Our average support response time is under 30 seconds.',
              },
              {
                title: 'Reliable Service',
                desc: 'Dedicated fiber lines with monitored uptime. When something goes wrong, we know about it before you do.',
              },
              {
                title: 'Scales With You',
                desc: "Need more bandwidth next year? Adding a second location? Our fiber network is built to scale. Upgrading your connection doesn\u2019t mean starting over.",
              },
              {
                title: 'One Provider, One Bill',
                desc: 'Internet, phone, networking, security, and hosting from one local company. Fewer vendors, fewer headaches, and one team that knows your setup.',
              },
            ].map((item) => (
              <div className="benefit-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="availability" id="quote">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Ready to get started?</h2>
            <p className="avail-sub">
              Tell us about your business and we&apos;ll put together a custom
              proposal within one business day.
            </p>
            <Link href="/service-request" className="btn btn-primary">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
