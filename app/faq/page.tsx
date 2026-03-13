import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { BreadcrumbSchema } from '@/components/SchemaOrg';
import type { FaqItem } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about SecureNet Fiber internet service, pricing, installation, and support.',
};

const generalFaq: FaqItem[] = [
  {
    question: 'What areas does SecureNet Fiber serve?',
    answer:
      `We currently serve the Kanawha Valley in West Virginia and Danville, Virginia. We're actively expanding \u2014 check the coverage page to see if your address is in our service area.`,
  },
  {
    question: 'Is there a contract?',
    answer:
      'No. All SecureNet Fiber plans are month-to-month with no long-term contracts or early termination fees.',
  },
  {
    question: 'Are there data caps?',
    answer:
      'No. Every plan includes truly unlimited data — no caps, no throttling, no overage charges.',
  },
  {
    question: 'What does "symmetrical" speed mean?',
    answer:
      'Symmetrical means your upload speed matches your download speed. If you have a 1 Gig plan, you get 1 Gbps down and 1 Gbps up. Cable providers typically offer upload speeds 10–20x slower than download.',
  },
];

const installFaq: FaqItem[] = [
  {
    question: 'How long does installation take?',
    answer:
      'Most installations are completed in 2–4 hours. A technician will run fiber to your home, install the ONT (optical network terminal), and set up your router.',
  },
  {
    question: 'Is there an installation fee?',
    answer:
      'Installation is free during our launch period. Standard installation may carry a fee in the future — check our current pricing for details.',
  },
  {
    question: 'Do I need to provide my own router?',
    answer:
      `No \u2014 a Wi-Fi router is included with every plan at no extra charge. You're also welcome to use your own equipment if you prefer.`,
  },
];

const billingFaq: FaqItem[] = [
  {
    question: 'How do I pay my bill?',
    answer:
      'You can pay online at billing.securenetfiber.com, or call our office. We accept credit/debit cards and ACH bank transfers.',
  },
  {
    question: 'When does billing start?',
    answer:
      `Billing starts on the date your service is activated. You'll receive your first bill within 30 days of installation.`,
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. The price you see is the price you pay. No equipment rental fees, no data overage charges, no surprise line items.',
  },
];

const supportFaq: FaqItem[] = [
  {
    question: 'What are your support hours?',
    answer:
      'Support is available Monday–Friday 8 AM – 8 PM and Saturday–Sunday 12 PM – 8 PM. Our office is open Monday–Friday 9 AM – 5 PM.',
  },
  {
    question: 'My internet is slow — what should I do?',
    answer:
      `First, try a wired speed test at securenet.speedtest.net to rule out Wi-Fi issues. Restart your router and check for firmware updates. If speeds are still below expected, contact our support team and we'll troubleshoot or schedule a service visit.`,
  },
  {
    question: 'How do I check for outages in my area?',
    answer:
      'Visit our network status page for real-time information on any service interruptions. You can also call our support line for updates.',
  },
];

export default function FaqPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'FAQ' }]} />

      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <p className="section-sub">
            Quick answers about our service, installation, billing, and support.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-container">
          <div className="faq-categories">
            <div className="faq-category">
              <h2 className="faq-category-title">General</h2>
              <FaqAccordion items={generalFaq} />
            </div>

            <div className="faq-category">
              <h2 className="faq-category-title">Installation</h2>
              <FaqAccordion items={installFaq} />
            </div>

            <div className="faq-category">
              <h2 className="faq-category-title">Billing</h2>
              <FaqAccordion items={billingFaq} />
            </div>

            <div className="faq-category">
              <h2 className="faq-category-title">Support</h2>
              <FaqAccordion items={supportFaq} />
            </div>
          </div>
        </div>
      </section>

      <section className="availability">
        <div className="section-container">
          <div className="avail-box">
            <h2 className="avail-heading">Still have questions?</h2>
            <p className="avail-sub">
              Our team is here to help. Reach out anytime during support hours.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link href="/residential" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
