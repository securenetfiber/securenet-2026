import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Business security from SecureNet. IP camera systems, access control, endpoint protection, and 24/7 network monitoring for commercial clients.',
};

export default function SecurityPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Security</h1>
          <p className="ent-page-hero-sub">
            Physical and cyber security for commercial operations. Installed and
            managed by our local team.
          </p>
        </div>
      </section>

      <section className="ent-section">
        <div className="section-container">
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Camera Systems</h3>
              <p>
                IP camera installations with remote viewing from any device,
                motion-triggered alerts, and cloud or on-premise recording.
                We handle the design, installation, and ongoing management.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Access Control</h3>
              <p>
                Card readers, key fobs, biometrics, and keypad entry for offices,
                warehouses, and retail spaces. Manage who gets in, when, and
                keep a full audit trail.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>24/7 Network Monitoring</h3>
              <p>
                Round-the-clock monitoring of your network for intrusion attempts,
                anomalies, and outages. We know about problems before you do.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Endpoint Protection</h3>
              <p>
                Managed antivirus, patch management, and threat prevention for
                your workstations and servers. Keeps your devices current and
                your data safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Secure your operation.</h2>
            <p>Call us to discuss cameras, access control, or network security for your business.</p>
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
