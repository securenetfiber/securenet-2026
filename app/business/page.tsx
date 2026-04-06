import type { Metadata } from 'next';
import Link from 'next/link';
import PlanCardWithLabel from '@/components/PlanCardWithLabel';
import { PlanSchema, BreadcrumbSchema } from '@/components/SchemaOrg';
import { businessPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Business Services',
  description:
    'Dedicated fiber, managed networks, VoIP phone, security, and data center services for businesses in the Kanawha Valley, WV and Danville, VA.',
};

export default function BusinessPage() {
  return (
    <>
      <PlanSchema plans={businessPlans} />
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Business' }]} />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Business Services</h1>
          <p className="section-sub">
            Dedicated fiber, managed networks, and full-service IT for businesses
            in the Kanawha Valley and Danville, VA.
          </p>
        </div>
      </section>

      {/* BUSINESS INTERNET PLANS */}
      <section className="plans" id="internet">
        <div className="section-container">
          <h2 className="section-heading">Business Internet</h2>
          <p className="section-sub">
            Dedicated fiber with symmetrical speeds and SLA-backed uptime. No
            data caps, no contracts.
          </p>

          <div className="plan-grid">
            {businessPlans.map((plan) => (
              <PlanCardWithLabel key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="plans-note">
            Need more speed? We offer connections up to 10 Gbps and dedicated
            internet access (DIA) circuits.{' '}
            <Link href="/service-request">Contact us for custom pricing.</Link>
          </p>
        </div>
      </section>

      {/* BUSINESS PHONE */}
      <section className="why-fiber" id="phone">
        <div className="section-container">
          <h2 className="section-heading">Business Phone</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Hosted Voice service built on our fiber network. Crystal-clear calls,
            no old-school phone company overhead.
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

      {/* MORE SERVICES */}
      <section className="services" id="services">
        <div className="section-container">
          <h2 className="section-heading">More for your business.</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Internet and phone are just the start. We handle the rest so you can
            focus on running your business.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <h3>Network Management</h3>
              <p>
                We design, install, and manage your business network. Switches,
                access points, firewalls, VPNs. Our team handles the day-to-day
                so your staff can focus on their work.
              </p>
              <Link href="/service-request" className="btn btn-outline" style={{ marginTop: 'var(--space-md)' }}>
                Request a Quote
              </Link>
            </div>

            <div className="benefit-card">
              <h3>Business Security</h3>
              <p>
                Camera systems, access control, endpoint protection, and network
                monitoring. Physical and cyber security for businesses of all
                sizes.
              </p>
              <Link href="/service-request" className="btn btn-outline" style={{ marginTop: 'var(--space-md)' }}>
                Request a Quote
              </Link>
            </div>

            <div className="benefit-card">
              <h3>Data Center Services</h3>
              <p>
                Colocation and rack space in our local data center. Redundant
                power, climate control, and fiber connectivity to our network
                backbone.
              </p>
              <Link href="/business/data-center-services" className="btn btn-outline" style={{ marginTop: 'var(--space-md)' }}>
                Learn More
              </Link>
            </div>
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
                title: 'SLA-Backed Uptime',
                desc: 'Every business connection comes with a service level agreement. We guarantee 99.9% uptime, and if we fall short, you get a credit.',
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
