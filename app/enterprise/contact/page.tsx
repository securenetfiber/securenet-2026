import type { Metadata } from 'next';
import EnterpriseContactForm from '@/components/EnterpriseContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with SecureNet Enterprise. Call us or send a message to discuss dedicated fiber, managed services, or business security.',
};

export default function EnterpriseContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="ent-page-hero">
        <div className="section-container">
          <h1 className="ent-page-hero-heading">Get in touch.</h1>
          <p className="ent-page-hero-sub">
            Call us directly or send a message. Our commercial team responds
            within one business day.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="ent-section">
        <div className="section-container">
          <div className="ent-contact-grid">
            {/* Phone-first info */}
            <div className="ent-contact-info">
              <div className="ent-contact-phone-block">
                <span className="ent-contact-label">Call us directly</span>
                <a href="tel:+13042050600" className="ent-contact-phone">
                  (304) 205-0600
                </a>
              </div>

              <div className="ent-contact-detail">
                <span className="ent-contact-label">Email</span>
                <a href="mailto:enterprise@securenetfiber.com">
                  enterprise@securenetfiber.com
                </a>
              </div>

              <div className="ent-contact-detail">
                <span className="ent-contact-label">Office</span>
                <p>
                  600 Virginia St W, Suite 200<br />
                  Charleston, WV 25302
                </p>
              </div>

              <div className="ent-contact-detail">
                <span className="ent-contact-label">Hours</span>
                <p>
                  Monday &ndash; Friday: 8 AM &ndash; 5 PM<br />
                  24/7 emergency support for managed clients
                </p>
              </div>
            </div>

            {/* Simple form */}
            <div className="ent-contact-form-wrap">
              <h2>Send us a message</h2>
              <EnterpriseContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
