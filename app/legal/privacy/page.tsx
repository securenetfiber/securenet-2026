import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="section-sub">How we collect, use, and protect your information.</p>
        </div>
      </section>
      <section className="about-story">
        <div className="section-container">
          <div className="story-content">
            <p>This page is under development. For questions about our privacy practices, please contact us at <a href="mailto:info@securenetfiber.com">info@securenetfiber.com</a> or call <a href="tel:+13047444034">(304) 744-4034</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
