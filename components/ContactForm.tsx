'use client';

import { useState, FormEvent } from 'react';

const INQUIRY_TYPES = [
  'General Question',
  "I'm interested in Internet Service",
  'Technical Support',
  'Billing',
  'Business Inquiry - Internet, Hosted Phones, Managed Services',
  'Outside Fiber Concern',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [customerType, setCustomerType] = useState('Residential');
  const [inquiryType, setInquiryType] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: Record<string, string | boolean> = {
      customerType,
      inquiryType,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      message: data.get('message') as string,
    };

    if (customerType === 'Business') {
      payload.businessName = data.get('businessName') as string;
      payload.primaryContact = data.get('primaryContact') as string;
    } else {
      payload.name = data.get('name') as string;
    }

    if (inquiryType === 'Technical Support') {
      payload.technicalIssue = data.get('technicalIssue') as string;
      const toggle = data.get('internetStillNotWorking');
      if (toggle) payload.internetStillNotWorking = true;
    }

    if (inquiryType === "I'm interested in Internet Service") {
      payload.serviceAddress = data.get('serviceAddress') as string;
      payload.serviceCity = data.get('serviceCity') as string;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3>Message sent!</h3>
        <p>Thanks for reaching out. Our team will get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Customer Type */}
      <div className="form-group">
        <label>Customer Type</label>
        <div className="form-radio-group">
          <label className="form-radio-label">
            <input
              type="radio"
              name="customerType"
              value="Residential"
              checked={customerType === 'Residential'}
              onChange={() => setCustomerType('Residential')}
            />
            <span>Residential</span>
          </label>
          <label className="form-radio-label">
            <input
              type="radio"
              name="customerType"
              value="Business"
              checked={customerType === 'Business'}
              onChange={() => setCustomerType('Business')}
            />
            <span>Business</span>
          </label>
        </div>
      </div>

      {/* Conditional name fields */}
      {customerType === 'Business' ? (
        <>
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input type="text" id="businessName" name="businessName" placeholder="Your business name" required />
          </div>
          <div className="form-group">
            <label htmlFor="primaryContact">Primary Contact</label>
            <input type="text" id="primaryContact" name="primaryContact" placeholder="Contact person" required />
          </div>
        </>
      ) : (
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
      )}

      {/* Always shown */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" placeholder="(555) 555-5555" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />
      </div>

      {/* Inquiry Type */}
      <div className="form-group">
        <label htmlFor="inquiryType">Inquiry Type</label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          required
        >
          <option value="">Select an inquiry type</option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Conditional: Technical Support */}
      {inquiryType === 'Technical Support' && (
        <>
          <div className="form-group">
            <label htmlFor="technicalIssue">Describe your technical issue</label>
            <textarea id="technicalIssue" name="technicalIssue" placeholder="What's happening?" rows={3} required></textarea>
          </div>
          <div className="form-group">
            <label className="form-checkbox-label">
              <input type="checkbox" name="internetStillNotWorking" value="true" />
              <span>My internet is still not working after troubleshooting</span>
            </label>
          </div>
        </>
      )}

      {/* Conditional: Interested in Service */}
      {inquiryType === "I'm interested in Internet Service" && (
        <>
          <div className="form-group">
            <label htmlFor="serviceAddress">Service Address</label>
            <input type="text" id="serviceAddress" name="serviceAddress" placeholder="123 Main St" required />
          </div>
          <div className="form-group">
            <label htmlFor="serviceCity">City</label>
            <input type="text" id="serviceCity" name="serviceCity" placeholder="South Charleston" required />
          </div>
        </>
      )}

      {/* Outside Fiber Concern note */}
      {inquiryType === 'Outside Fiber Concern' && (
        <p className="form-help-text">
          If you need to share photos of an outside fiber concern, please email them to{' '}
          <a href="mailto:info@securenetfiber.com">info@securenetfiber.com</a> along with your address.
        </p>
      )}

      {/* Message - always shown */}
      <div className="form-group">
        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" placeholder="How can we help?" rows={5} required></textarea>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
