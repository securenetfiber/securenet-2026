import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/SchemaOrg';
import { reviewSections } from '@/lib/testimonials';

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description:
    'See what real customers are saying about SecureNet Fiber internet. Read reviews about our speed, local support, and value.',
};

function Stars({ count }: { count: number }) {
  return (
    <span className="rv-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Reviews' }]} />

      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">What our customers are saying.</h1>
          <p className="section-sub">
            Real reviews from real people in the Kanawha Valley. No scripts, no spin.
          </p>
        </div>
      </section>

      <section className="rv-sections">
        <div className="section-container">
          {reviewSections.map((section) => (
            <div key={section.id} className="rv-section" id={section.id}>
              <h2 className="rv-section-title">{section.title}</h2>
              <p className="rv-section-desc">{section.description}</p>
              <div className="rv-grid">
                {section.reviews.map((review, i) => (
                  <div key={i} className="rv-card">
                    <Stars count={review.stars} />
                    <blockquote className="rv-quote">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <p className="rv-name">
                      {review.name}{review.city ? `, ${review.city}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rv-cta">
        <div className="section-container rv-cta-inner">
          <h2 className="rv-cta-heading">Love SecureNet?</h2>
          <p className="rv-cta-text">
            Leave us a review on Google. It helps your neighbors find better internet.
          </p>
          <a
            href="https://g.page/r/CUJPE5kGptyvEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Write a Review
          </a>
        </div>
      </section>
    </>
  );
}
