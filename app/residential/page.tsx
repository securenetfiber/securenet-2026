import type { Metadata } from 'next';
import PlanCard from '@/components/PlanCard';
import AvailabilityCheck from '@/components/AvailabilityCheck';
import { residentialPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Residential Internet Plans',
  description:
    'Fiber-to-the-home internet starting at $52/mo. No contracts, no hidden fees, no data caps. Available in the Kanawha Valley, WV and Danville, VA.',
};

export default function ResidentialPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Residential Internet</h1>
          <p className="section-sub">
            Fiber-to-the-home starting at $52/mo. No contracts, no hidden fees.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="plans" id="plans">
        <div className="section-container">
          <h2 className="section-heading">Pick your speed.</h2>
          <p className="section-sub">
            Every plan includes symmetrical upload and download speeds, no data
            caps, and no annual contracts.
          </p>

          <div className="plan-grid">
            {residentialPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Fiber */}
      <section className="why-fiber">
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
              <h3>Symmetrical Speeds</h3>
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
      <section className="included">
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
                title: 'No Contracts',
                desc: 'Stay because you want to, not because you have to. Cancel anytime with no early termination fees.',
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
                desc: 'We provide a high-performance Wi-Fi router with every plan. No need to buy your own unless you want to.',
              },
              {
                title: 'Streaming TV Options',
                desc: 'Cut the cord. We partner with MyBundle.TV to help you find the right streaming setup. Works with Netflix, YouTube TV, Hulu, Disney+, Paramount+, and more on Fire Stick, Roku, or Apple TV.',
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
