import type { Metadata } from 'next';
import Link from 'next/link';
import PlanCardWithLabel from '@/components/PlanCardWithLabel';
import { PlanSchema, BreadcrumbSchema } from '@/components/SchemaOrg';
import { businessPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Commercial & Managed Services',
  description:
    'Dedicated fiber, dedicated internet access, managed networks, business security, and data center colocation for commercial clients in West Virginia and Virginia.',
};

// Higher tier business plans for commercial / managed clients.
const commercialPlans = businessPlans.filter((p) =>
  ['biz-2g', 'biz-5g', 'biz-8g'].includes(p.id)
);

export default function ManagedServicesPage() {
  return (
    <>
      <PlanSchema plans={commercialPlans} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Business', href: '/business' },
          { name: 'Commercial & Managed Services' },
        ]}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Commercial &amp; Managed Services</h1>
          <p className="section-sub">
            Dedicated fiber with the same upload and download speeds, plus SLA-backed uptime. No
            data caps, no contracts.
          </p>
        </div>
      </section>

      {/* Jump Nav */}
      <nav className="page-jump-nav" aria-label="Page sections">
        <ul className="jump-nav-list">
          <li><a href="#circuits">Circuits</a></li>
          <li><a href="#dia">DIA</a></li>
          <li><a href="#managed">Managed</a></li>
          <li><a href="#security">Security</a></li>
          <li><a href="#data-center">Data Center</a></li>
          <li><a href="#quote">Get a Quote</a></li>
        </ul>
      </nav>

      {/* Dedicated Circuits */}
      <section className="plans" id="circuits">
        <div className="section-container">
          <h2 className="section-heading">Dedicated Fiber Circuits</h2>
          <p className="section-sub">
            High-bandwidth circuits for commercial sites, data-intensive
            operations, and multi-location deployments.
          </p>

          <div className="plan-grid">
            {commercialPlans.map((plan) => (
              <PlanCardWithLabel key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="plans-note">
            Need something custom? We offer connections beyond 8.5 Gbps and
            point-to-point configurations.{' '}
            <Link href="/service-request">Request a quote</Link>.
          </p>
        </div>
      </section>

      {/* DIA */}
      <section className="why-fiber" id="dia">
        <div className="section-container">
          <h2 className="section-heading">Dedicated Internet Access (DIA)</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Uncontended bandwidth with the same speed up and down, for organizations that need
            guaranteed performance. No sharing with neighbors, no peak hour
            slowdowns.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <h3>Guaranteed Bandwidth</h3>
              <p>
                Your circuit is yours. Full upload and download speeds available 24/7,
                regardless of what your neighbors are doing on the network.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Static IP Addresses</h3>
              <p>
                Public IPv4 and IPv6 blocks included. Host services, run VPNs,
                or anything else that needs a fixed address.
              </p>
            </div>
            <div className="benefit-card">
              <h3>BGP Available</h3>
              <p>
                Bring your own IP space and run BGP with us. Multi-homing,
                failover, and direct routing control for organizations that
                need it.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Custom Configurations</h3>
              <p>
                Point-to-point, dark fiber, dedicated wavelengths, and private
                interconnects available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Managed Services */}
      <section className="services" id="managed">
        <div className="section-container">
          <h2 className="section-heading">Managed Network Services</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            We design, install, and manage your business network so your team
            can focus on running the business.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <h3>Network Design &amp; Install</h3>
              <p>
                Switches, access points, firewalls, structured cabling. We
                build it right the first time.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Day-to-Day Management</h3>
              <p>
                Monitoring, firmware updates, configuration changes, and
                troubleshooting handled by our team.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Wi-Fi for Business</h3>
              <p>
                Enterprise-grade Wi-Fi with seamless roaming, guest networks,
                and detailed analytics for retail, hospitality, and offices.
              </p>
            </div>
            <div className="benefit-card">
              <h3>VPN &amp; Site-to-Site</h3>
              <p>
                Connect remote workers and branch offices to your main
                network with managed VPN tunnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="why-fiber" id="security">
        <div className="section-container">
          <h2 className="section-heading">Business Security</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Physical and cyber security for businesses of all sizes.
          </p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <h3>Camera Systems</h3>
              <p>
                IP camera installations with remote viewing, motion alerts,
                and cloud or on-premise recording.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Access Control</h3>
              <p>
                Card readers, keypad entry, and managed access for offices,
                warehouses, and retail spaces.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Endpoint Protection</h3>
              <p>
                Managed antivirus, patching, and threat detection for your
                workstations and servers.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Network Monitoring</h3>
              <p>
                24/7 monitoring of your network for intrusion attempts,
                anomalies, and outages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Center */}
      <section className="services" id="data-center">
        <div className="section-container">
          <h2 className="section-heading">Data Center &amp; Colocation</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Local colocation in our South Charleston, WV data center with
            redundant power, multi-carrier connectivity, and 24/7 security.
          </p>

          <div className="cta-box" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              Partial racks, full cabinets, and remote hands available. Direct
              fiber connectivity to our network backbone.
            </p>
            <Link href="/business/data-center-services" className="btn btn-primary">
              Data Center Details
            </Link>
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="availability" id="quote">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Let&apos;s build your solution.</h2>
            <p className="avail-sub">
              Tell us about your operation. Our commercial team will scope a
              custom proposal and get back to you within one business day.
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
