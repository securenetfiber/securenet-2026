import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Connectivity',
  description:
    'Enterprise fiber connectivity from SecureNet. Network design, dedicated internet access, circuits up to 8.5 Gbps, enterprise Wi-Fi, point-to-point, and dark fiber.',
};

export default function ConnectivityPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Connectivity</h1>
          <p className="ent-page-hero-sub">
            From network design to dedicated circuits, we build and manage
            the infrastructure your operation depends on.
          </p>
        </div>
      </section>

      {/* Network Design */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Network Design &amp; Infrastructure</h2>
          <p className="ent-section-sub">
            We design, build, and manage networks from the ground up.
            Structured cabling, switching, routing, firewalls, and wireless
            &mdash; all backed by 30 years of project management.
          </p>
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Structured Cabling</h3>
              <p>Cat6/6A, fiber backbone, patch panels, and cable management. Clean runs, tested and certified.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Switching &amp; Routing</h3>
              <p>Enterprise-grade switching with VLANs, QoS, and redundancy. Managed and monitored by our team.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Firewall &amp; Security</h3>
              <p>Next-gen firewalls with intrusion prevention, content filtering, and VPN termination.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Project Management</h3>
              <p>Site surveys, scope documents, timelines, and clean handoffs. No surprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIA */}
      <section className="ent-section ent-section--alt">
        <div className="section-container">
          <h2 className="ent-section-heading">Dedicated Internet Access</h2>
          <p className="ent-section-sub">
            Uncontended bandwidth with the same speed up and down. Your circuit
            is yours &mdash; no sharing, no peak-hour slowdowns.
          </p>
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Guaranteed Bandwidth</h3>
              <p>Full upload and download speeds available 24/7, regardless of what your neighbors are doing.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Static IP Addresses</h3>
              <p>Public IPv4 and IPv6 blocks included. Host services, run VPNs, or anything that needs a fixed address.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>SLA-Backed Uptime</h3>
              <p>Service level agreements with uptime guarantees and defined response times.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Scalable</h3>
              <p>Start where you need and scale up without replacing hardware or starting over.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Circuits */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Dedicated Circuits</h2>
          <p className="ent-section-sub">
            Fiber circuits from 500 Mbps to 8.5 Gbps and beyond. Same speed
            up and down, no data caps, no contracts.
          </p>
          <div className="ent-speed-list">
            {['500 Mbps', '1 Gbps', '2 Gbps', '5 Gbps', '8.5 Gbps', 'Custom'].map((speed) => (
              <div className="ent-speed-item" key={speed}>
                <span className="ent-speed-value">{speed}</span>
                <span className="ent-speed-label">symmetric fiber</span>
              </div>
            ))}
          </div>
          <p className="ent-section-note">
            Need something beyond 8.5 Gbps? We do custom configurations,
            dark fiber, and wavelength services.{' '}
            <Link href="/enterprise/contact">Let&rsquo;s talk</Link>.
          </p>
        </div>
      </section>

      {/* Wi-Fi */}
      <section className="ent-section ent-section--alt">
        <div className="section-container">
          <h2 className="ent-section-heading">Enterprise Wi-Fi</h2>
          <p className="ent-section-sub">
            Enterprise-grade wireless with seamless roaming, guest networks,
            and centralized management.
          </p>
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Office &amp; Campus</h3>
              <p>Full-coverage wireless with seamless roaming between access points. No dead zones, no dropped connections.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Guest Networks</h3>
              <p>Isolated guest access with bandwidth controls and captive portal options.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Hospitality</h3>
              <p>Hotel and property-wide Wi-Fi with captive portal landing pages, per-room access, and whole-property coverage.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Analytics</h3>
              <p>Usage reporting, device tracking, and capacity planning to keep your network ahead of demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced */}
      <section className="ent-section">
        <div className="section-container">
          <h2 className="ent-section-heading">Advanced Connectivity</h2>
          <p className="ent-section-sub">
            For organizations with complex networking requirements.
          </p>
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Point-to-Point</h3>
              <p>Private fiber links between your locations with guaranteed bandwidth and low latency.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>Dark Fiber</h3>
              <p>Unlit fiber strands for organizations that want to run their own equipment and protocols.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>BGP</h3>
              <p>Bring your own IP space and run BGP with us. Multi-homing, failover, and direct routing control.</p>
            </div>
            <div className="ent-benefit-card">
              <h3>VPN &amp; SD-WAN</h3>
              <p>Connect remote workers and branch offices with managed VPN tunnels and SD-WAN solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Let&rsquo;s design your network.</h2>
            <p>Call us to discuss your connectivity needs. We&rsquo;ll scope a solution and get back to you within one business day.</p>
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
