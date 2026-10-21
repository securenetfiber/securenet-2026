import type { Metadata } from 'next';
import { SAME_FIBER } from '@/lib/samefiber';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';

// Display only. The conversion fires on /danville-fiber when the form submits,
// so refreshing this page never double counts.
export const metadata: Metadata = {
  title: { absolute: SAME_FIBER_COPY.meta.thankYouTitle },
  robots: { index: false, follow: false },
};

const t = SAME_FIBER_COPY.thankYou;

export default function DanvilleFiberThankYouPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">{t.heading}</h1>
          <p className="section-sub">{SAME_FIBER.callbackPromise}</p>
        </div>
      </section>

      <section className="signup-section">
        <div className="section-container signup-container signup-container--form">
          <div className="signup-form-area">
            <p className="sf-thanks-note">
              <strong>{t.noteStrong}</strong>
              {t.noteRest}
            </p>
          </div>

          <div className="signup-sidebar">
            <div className="signup-card">
              <h3>{t.callHeading}</h3>
              <div className="signup-phones">
                <div className="signup-phone">
                  <a href={`tel:${SAME_FIBER.phone.tel}`}>{SAME_FIBER.phone.display}</a>
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
