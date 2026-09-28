import type { Metadata } from 'next';
import { SWITCH_OFFER } from '@/lib/switch-offer';
import { SWITCH_COPY } from '@/lib/switch-copy';

// Display only. The conversion fires on /switch when the form submits,
// so refreshing this page never double counts.
export const metadata: Metadata = {
  title: SWITCH_COPY.meta.thankYouTitle,
  robots: { index: false, follow: false },
};

const t = SWITCH_COPY.thankYou;

export default function SwitchThankYouPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">{t.heading}</h1>
          <p className="section-sub">{SWITCH_OFFER.callbackPromise}</p>
        </div>
      </section>

      <section className="signup-section">
        <div className="section-container signup-container signup-container--form">
          <div className="signup-form-area switch-thanks-body">
            <p className={`switch-thanks-note${SWITCH_OFFER.showCalendly ? '' : ' switch-thanks-note--last'}`}>{t.note}</p>

            {SWITCH_OFFER.showCalendly && (
              <a
                href="https://calendly.com/securenetoperations"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.scheduleButton}
              </a>
            )}
          </div>

          <div className="signup-sidebar">
            <div className="signup-card">
              <h3>{t.callHeading}</h3>
              <div className="signup-phones">
                <div className="signup-phone">
                  <a href={`tel:${SWITCH_OFFER.phone.tel}`}>{SWITCH_OFFER.phone.display}</a>
                </div>
              </div>
              <p className="signup-hours">{t.callHours}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
