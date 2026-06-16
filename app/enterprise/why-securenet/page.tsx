import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why SecureNet',
  description:
    'Why enterprise clients choose SecureNet. Local support, real fiber, no contracts, and deep experience in the valley.',
};

export default function WhySecureNetPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Why SecureNet.</h1>
          <p className="ent-page-hero-sub">
            We&rsquo;re not a national carrier with a 1-800 number. We&rsquo;re
            your neighbors.
          </p>
        </div>
      </section>

      <section className="ent-section">
        <div className="section-container">
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Local Support, Real People</h3>
              <p>
                When you call us, you get someone who lives in the valley. No
                phone trees, no overseas call centers. Our average support
                response time is under 30 seconds.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Real Fiber, Not &ldquo;Fiber Powered&rdquo;</h3>
              <p>
                Some providers run fiber to a node and then switch to copper.
                That bottleneck kills your upload speed and reliability. We run
                fiber directly to your building. Same speed up and down.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>No Contracts</h3>
              <p>
                Month-to-month service. We keep your business by earning it
                every month, not by locking you into a multi-year agreement
                with early termination fees.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>One Provider, One Bill</h3>
              <p>
                Internet, phone, networking, security, and video from one local
                company. Fewer vendors, fewer headaches, and one team that
                knows your entire setup.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Deep Experience</h3>
              <p>
                Our team brings decades of combined experience building and
                managing networks in this region. We know the infrastructure,
                the terrain, and the businesses that depend on connectivity.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Reliable Service</h3>
              <p>
                Dedicated fiber lines with monitored uptime. When something goes
                wrong, we know about it before you do. And we&rsquo;re local
                enough to be on-site fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Optimum callout */}
      <section className="ent-callout">
        <div className="section-container">
          <div className="ent-callout-inner">
            <h2>Not all fiber is created equal.</h2>
            <p>
              &ldquo;Fiber powered&rdquo; often means fiber to a neighborhood
              node, then shared copper or coax for the last mile. The result:
              slow uploads, inconsistent speeds during peak hours, and a
              bottleneck that no amount of marketing can fix. SecureNet delivers
              fiber directly to your premises. No copper. No compromises.
            </p>
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>See the difference.</h2>
            <p>Call us to discuss what SecureNet can do for your operation.</p>
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
