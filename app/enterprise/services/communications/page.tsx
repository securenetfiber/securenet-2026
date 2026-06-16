import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Communications',
  description:
    'Enterprise voice and communications from SecureNet. Hosted PBX, VoIP, auto attendant, hunt groups, voicemail to email, and extension dialing across locations.',
};

export default function CommunicationsPage() {
  return (
    <>
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Communications</h1>
          <p className="ent-page-hero-sub">
            Hosted Voice built on our fiber network. Crystal-clear calls,
            no old-school phone company overhead.
          </p>
        </div>
      </section>

      <section className="ent-section">
        <div className="section-container">
          <div className="ent-benefit-grid">
            <div className="ent-benefit-card">
              <h3>Hosted PBX / VoIP</h3>
              <p>
                Full-featured phone system without the hardware. Unlimited local
                and long-distance calling, managed and monitored by our team.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Auto Attendant</h3>
              <p>
                Greet callers with a professional menu system. Route calls to the
                right department or person automatically, day or night.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Hunt Groups</h3>
              <p>
                Ring multiple phones at once or in sequence until someone picks up.
                Make sure your customers always reach a real person.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Extension Dialing</h3>
              <p>
                Dial between offices and locations using short extensions. Works
                across all your SecureNet locations as if they were one building.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Voicemail to Email</h3>
              <p>
                Every voicemail delivered to your inbox as an audio file. Listen
                from anywhere without dialing in.
              </p>
            </div>
            <div className="ent-benefit-card">
              <h3>Fax to Email</h3>
              <p>
                Receive faxes as email attachments. No fax machine, no paper jams,
                no dedicated phone line.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ent-cta">
        <div className="section-container">
          <div className="ent-cta-inner">
            <h2>Upgrade your phone system.</h2>
            <p>Call us to discuss VoIP, hosted PBX, or multi-location communications.</p>
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
