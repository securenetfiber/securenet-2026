import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
  description:
    'Your sign-up request has been received. Our team will contact you within one business day.',
};

export default function ThankYouPage() {
  return (
    <section className="page-hero">
      <div className="section-container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#10003;</div>
        <h1 className="section-heading">Thank You!</h1>
        <p className="section-sub" style={{ maxWidth: '540px', margin: '0 auto 2rem' }}>
          Your request has been received. Our team will call you within one
          business day to confirm your plan, verify availability, and schedule
          installation.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
