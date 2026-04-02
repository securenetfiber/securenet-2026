import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'SecureNet Fiber was founded in 2015 in South Charleston, WV. We are a locally owned fiber ISP serving the Kanawha Valley and Danville, VA.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">About SecureNet</h1>
          <p className="section-sub">
            A local company built on the idea that our communities deserve better
            internet.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <div className="section-container">
          <div className="story-content">
            <h2 className="section-heading">How we got here.</h2>
            <p>
              SecureNet Fiber was founded in 2015 by Kevin Mullins in South
              Charleston, West Virginia. Kevin had grown frustrated with the
              broadband options available in the Kanawha Valley. Slow speeds, poor
              service, and rising prices were the norm, and nobody seemed
              interested in fixing it.
            </p>
            <p>
              SecureNet started as a spinoff of South Charleston&apos;s municipal
              fiber network. The city had already invested in fiber
              infrastructure, and Kevin saw an opportunity to put that investment
              to work for residents and businesses across the region.
            </p>
            <p>
              What began as a small operation in one city has grown into a fiber
              internet provider serving communities in West Virginia and Virginia.
              Every member of our team lives in the areas we serve. We answer the
              phone when you call. We show up when we say we will. And we share
              revenue with the partner cities that helped make this possible.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="about-values">
        <div className="section-container">
          <h2 className="section-heading">What makes us different.</h2>
          <p className="section-sub">
            We&apos;re not a national corporation. We&apos;re your neighbors.
          </p>
          <div className="values-grid">
            <div className="value-card">
              <h3>Locally Owned</h3>
              <p>
                SecureNet is headquartered in South Charleston, WV. Our founder
                and leadership team live right here. Decisions are made locally,
                not in a boardroom hundreds of miles away.
              </p>
            </div>
            <div className="value-card">
              <h3>All Local Employees</h3>
              <p>
                Every technician, support rep, and office team member is from the
                communities we serve. When you call us, you&apos;re talking to a
                neighbor.
              </p>
            </div>
            <div className="value-card">
              <h3>World-Class Support</h3>
              <p>
                We pick up the phone in under 30 seconds on average. No phone
                trees, no overseas call centers, no runaround. Just real people
                who know the network and want to help.
              </p>
            </div>
            <div className="value-card">
              <h3>Invested in Community</h3>
              <p>
                We share revenue with our partner cities so your internet bill
                helps fund local services and infrastructure. When SecureNet
                grows, the community benefits directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats-section">
        <div className="section-container">
          <div className="about-stats-grid">
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Network Uptime</span>
            </div>
            <div className="stat">
              <span className="stat-number">&lt;30s</span>
              <span className="stat-label">Avg. Support Answer Time</span>
            </div>
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-label">Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="section-container">
          <div className="cta-box">
            <h2 className="section-heading">Ready to make the switch?</h2>
            <p className="section-sub">
              See if SecureNet Fiber is available at your address, or get in touch
              with our team.
            </p>
            <div className="cta-actions">
              <Link href="/service-request" className="btn btn-primary btn-lg">
                Sign Up
              </Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
