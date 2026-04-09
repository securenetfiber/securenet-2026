import type { Metadata } from 'next';
import { Suspense } from 'react';
import ReferralGenerator from '@/components/ReferralGenerator';
import FaqAccordion from '@/components/FaqAccordion';
import { BreadcrumbSchema } from '@/components/SchemaOrg';
import type { FaqItem } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Refer a Friend - Get a Free Month',
  description:
    'Refer a friend to SecureNet Fiber and you both get a free month of internet. Share your unique referral link today.',
};

const referralFaq: FaqItem[] = [
  {
    question: 'Who is eligible to refer?',
    answer:
      'Any active SecureNet Fiber residential customer can refer friends and family.',
  },
  {
    question: 'How many friends can I refer?',
    answer:
      'There is no limit. Refer as many people as you like and earn a free month for each one who signs up and gets installed.',
  },
  {
    question: 'When do I get my free month?',
    answer:
      'Your bill credit is applied after the person you referred has their service installed and their account is active for 30 days.',
  },
  {
    question: 'Does my friend get a free month too?',
    answer:
      'Yes. Both you and the person you refer each get one free month of service.',
  },
  {
    question: 'Can I use a physical referral card instead?',
    answer:
      'Absolutely. Give your referral card to a friend or have them enter the code from the card on this page. The code works the same way as the online link.',
  },
  {
    question: 'Does this work for business plans?',
    answer:
      'The referral program is for residential plans only at this time.',
  },
];

export default function ReferralPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Refer a Friend' }]} />

      {/* Hero */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Bring a Friend, Get a Free Month.</h1>
          <p className="section-sub">
            When your friend signs up for SecureNet Fiber and gets installed,
            you <strong>both</strong> get a free month of internet.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="ref-how" id="how">
        <div className="section-container">
          <h2 className="section-heading">How it works.</h2>
          <div className="ref-steps">
            <div className="ref-step">
              <div className="ref-step-number">1</div>
              <h3 className="ref-step-title">Share Your Link</h3>
              <p className="ref-step-desc">
                Generate your unique referral link below, or use the code from
                your referral card.
              </p>
            </div>
            <div className="ref-step">
              <div className="ref-step-number">2</div>
              <h3 className="ref-step-title">Friend Signs Up</h3>
              <p className="ref-step-desc">
                Your friend uses your link to sign up for any SecureNet
                residential plan.
              </p>
            </div>
            <div className="ref-step">
              <div className="ref-step-number">3</div>
              <h3 className="ref-step-title">You Both Save</h3>
              <p className="ref-step-desc">
                After your friend is installed, you each get a free month of
                service credited to your bill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Generator / Referred — client component with URL params */}
      <Suspense fallback={null}>
        <ReferralGenerator />
      </Suspense>

      {/* Referral FAQ */}
      <section className="ref-faq" id="faq">
        <div className="section-container">
          <h2 className="section-heading">Referral FAQ.</h2>
          <FaqAccordion items={referralFaq} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="ref-cta">
        <div className="section-container">
          <div className="ref-cta-box">
            <h2>Ready to get started?</h2>
            <p>Sign up for SecureNet Fiber today. No contracts, no data caps.</p>
            <a href="/service-request" className="btn btn-primary btn-lg">
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
