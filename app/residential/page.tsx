import type { Metadata } from 'next';
import PlanCardWithLabel from '@/components/PlanCardWithLabel';
import AvailabilityCheck from '@/components/AvailabilityCheck';
import { PlanSchema, BreadcrumbSchema } from '@/components/SchemaOrg';
import { residentialPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Residential Internet Plans',
  description:
    '100% fiber internet starting at $52/mo. No contracts, no hidden fees, no data caps. Available in the Kanawha Valley, WV and Danville, VA.',
};

export default function ResidentialPage() {
  return (
    <>
      <PlanSchema plans={residentialPlans} />
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Residential' }]} />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Residential Internet</h1>
          <p className="section-sub">
            100% fiber starting at $52/mo. No contracts, no hidden fees.
          </p>
        </div>
      </section>

      {/* Jump Nav */}
      <nav className="page-jump-nav" aria-label="Page sections">
        <ul className="jump-nav-list">
          <li><a href="#plans">Internet Plans</a></li>
          <li><a href="#home-phone">Home Phone</a></li>
          <li><a href="#add-ons">Add-Ons</a></li>
          <li><a href="#directv">Streaming TV</a></li>
          <li><a href="#why-fiber">Why Fiber</a></li>
          <li><a href="#included">What&apos;s Included</a></li>
          <li><a href="#check">Check Address</a></li>
        </ul>
      </nav>

      {/* Plans */}
      <section className="plans" id="plans">
        <div className="section-container">
          <h2 className="section-heading">Pick your speed.</h2>
          <p className="section-sub">
            Every plan includes the same upload and download speeds, no data
            caps, and no annual contracts.
          </p>

          <div className="plan-grid">
            {residentialPlans.map((plan) => (
              <PlanCardWithLabel key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Home Phone */}
      <section className="why-fiber" id="home-phone">
        <div className="section-container">
          <h2 className="section-heading">Add Home Phone.</h2>
          <p className="section-sub">
            Crystal-clear voice service built on our fiber network. Keep your
            existing number, unlimited local and long distance, and all the
            features you expect.
          </p>
          <div className="phone-layout">
            <div className="phone-price-card">
              <div className="phone-price-label">Home Phone</div>
              <div className="phone-price-amount">
                <span className="phone-price-dollar">$</span>
                <span className="phone-price-value">23</span>
                <span className="phone-price-period">/mo</span>
              </div>
              <div className="phone-price-note">Plus tax. No contracts.</div>
              <a href="/service-request" className="btn btn-primary btn-full">
                Add to Your Plan
              </a>
            </div>
            <div className="phone-features">
              <div className="phone-feature">
                <h3>Unlimited Calling</h3>
                <p>
                  Unlimited local and long distance calling included. No
                  per-minute charges, no caps.
                </p>
              </div>
              <div className="phone-feature">
                <h3>Standard Features</h3>
                <p>
                  Caller ID, call waiting, 3-way calling, call forwarding,
                  voice mail, and do not disturb.
                </p>
              </div>
              <div className="phone-feature">
                <h3>Keep Your Number</h3>
                <p>
                  Port your existing phone number from your current provider.
                  Transfer takes 3 to 5 days.
                </p>
              </div>
              <div className="phone-feature">
                <h3>E911 Included</h3>
                <p>
                  Full E911 emergency service, 411 directory assistance, and
                  white page listings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="included" id="add-ons">
        <div className="section-container">
          <h2 className="section-heading">Add-ons.</h2>
          <p className="section-sub">
            Optional services you can add to any internet plan.
          </p>
          <div className="addon-grid">
            <div className="addon-card">
              <div className="addon-name">FiberProtect</div>
              <div className="addon-price">$8<span>/mo</span></div>
              <p>
                Equipment protection for your fiber line and SecureNet
                equipment. Covers accidental damage, wear and tear, pets, and
                vandalism.
              </p>
            </div>
            <div className="addon-card">
              <div className="addon-name">Extra Mesh Router</div>
              <div className="addon-price">$10<span>/mo</span></div>
              <p>
                Add an extra mesh node to extend Wi-Fi coverage to large homes
                or hard-to-reach rooms. Per unit, per month.
              </p>
            </div>
            <div className="addon-card">
              <div className="addon-name">Static IP</div>
              <div className="addon-price">$10<span>/mo</span></div>
              <p>
                A dedicated public IP address for hosting, remote access, VPN,
                or any service that needs a fixed address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DirecTV CTA -- TODO: hide or update this CTA when needed */}
      <section className="directv-cta" id="directv">
        <div className="section-container">
          <div className="directv-banner">
            <div className="directv-text">
              <p className="directv-eyebrow">Streaming TV Available</p>
              <h2>Add DirecTV streaming to your plan.</h2>
              <p>
                Live sports, local channels, and on-demand content streamed
                straight to your TV. No contracts, no activation fees, and
                works right over your SecureNet fiber connection.
              </p>
            </div>
            <a href="/service-request" className="btn btn-primary btn-lg">
              Call for Details
            </a>
          </div>
        </div>
      </section>

      {/* Why Fiber */}
      <section className="why-fiber" id="why-fiber">
        <div className="section-container">
          <h2 className="section-heading">Why fiber.</h2>
          <p className="section-sub">
            Fiber optic internet is faster, more reliable, and more future-proof
            than cable or DSL.
          </p>
          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
              </div>
              <h3>Same Speed Up and Down</h3>
              <p>
                Your upload speed matches your download speed. Video calls, cloud
                backups, and file sharing all work the way they should.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3>No Peak Hour Slowdowns</h3>
              <p>
                Cable networks get congested when everyone comes home and gets
                online. Fiber doesn&apos;t. You get the same speed at 7 PM as you do
                at 3 AM.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3>Lower Latency</h3>
              <p>
                Fiber has less lag than cable or DSL. That matters for gaming,
                video calls, and anything that needs a quick response from the
                internet.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>
              </div>
              <h3>Built for the Long Haul</h3>
              <p>
                Fiber infrastructure can handle speeds well beyond what we offer
                today. As the internet demands more, your connection is already
                ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="included" id="included">
        <div className="section-container">
          <h2 className="section-heading">What&apos;s included.</h2>
          <p className="section-sub">
            Every SecureNet plan comes with the basics covered, plus a few
            extras.
          </p>
          <div className="included-grid">
            {[
              {
                title: 'No Data Caps',
                desc: 'Use as much internet as you want. We don\u2019t throttle or charge overage fees. Ever.',
              },
              {
                title: '3-Year Price Lock',
                desc: 'Your monthly rate stays the same for three years. No surprise increases.',
              },
              {
                title: 'Free Installation',
                desc: 'Standard installation is free during our launch period. We\u2019ll run fiber to your home and get you set up at no extra cost.',
              },
              {
                title: 'Local Support',
                desc: 'When you call us, you talk to someone nearby. Our support team is based right here, not in a call center halfway around the world.',
              },
              {
                title: 'Wi-Fi Router Included',
                desc: 'Our 500 Mbps, 1 Gig, and 2 Gig plans include a high-performance Wi-Fi router at no extra cost. Our 5 Gig and 8.5 Gig plans are circuit only for customers who prefer their own networking equipment.',
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

      {/* Availability Check */}
      <AvailabilityCheck />
    </>
  );
}
