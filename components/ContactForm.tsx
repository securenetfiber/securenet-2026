'use client';

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';

const RESIDENTIAL_INQUIRY_TYPES = [
  'General Inquiry',
  "I'm interested in Internet Service from my Home!",
  'Technical Support',
  'Billing Question',
  'Outside Fiber Service Concern',
];

const BUSINESS_INQUIRY_TYPES = [
  'General Inquiry',
  'Business Inquiry - Internet, Hosted Phones, Managed Services',
  'Technical Support',
  'Billing Question',
  'Outside Fiber Service Concern',
];

const TECHNICAL_ISSUES = [
  'My Internet Service is Not Working',
  'My Internet and/or Wi-Fi is Slow',
  'My Phone Service is not working',
  'I forgot my Wi-Fi Password',
];

/** Format phone input as (XXX) XXX-XXXX */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const RESET_DELAY = 5000; // ms before form resets after successful submission

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  const [customerType, setCustomerType] = useState('Residential');
  const [inquiryType, setInquiryType] = useState('');
  const [technicalIssue, setTechnicalIssue] = useState('');

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setSubmitting(false);
    setError('');
    setPhone('');
    setCustomerType('Residential');
    setInquiryType('');
    setTechnicalIssue('');
  }, []);

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(resetForm, RESET_DELAY);
    return () => clearTimeout(timer);
  }, [submitted, resetForm]);

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

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
      phone: phone,
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

    if (inquiryType === "I'm interested in Internet Service from my Home!") {
      payload.serviceAddress = data.get('newServiceRequestAddress') as string;
      payload.serviceCity = data.get('newServiceRequestCity') as string;
    }

    if (inquiryType === 'Outside Fiber Service Concern') {
      payload.serviceAddress = data.get('serviceAddress') as string;
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
              onChange={() => { setCustomerType('Residential'); setInquiryType(''); setTechnicalIssue(''); }}
            />
            <span>Residential</span>
          </label>
          <label className="form-radio-label">
            <input
              type="radio"
              name="customerType"
              value="Business"
              checked={customerType === 'Business'}
              onChange={() => { setCustomerType('Business'); setInquiryType(''); setTechnicalIssue(''); }}
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
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="(304) 555-1234"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
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
          {(customerType === 'Business' ? BUSINESS_INQUIRY_TYPES : RESIDENTIAL_INQUIRY_TYPES).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Conditional: Technical Support */}
      {inquiryType === 'Technical Support' && (
        <>
          <div className="form-group">
            <label htmlFor="technicalIssue">What are you experiencing?</label>
            <select
              id="technicalIssue"
              name="technicalIssue"
              value={technicalIssue}
              onChange={(e) => setTechnicalIssue(e.target.value)}
              required
            >
              <option value="">Select an issue</option>
              {TECHNICAL_ISSUES.map((issue) => (
                <option key={issue} value={issue}>{issue}</option>
              ))}
            </select>
          </div>
          {technicalIssue === 'My Internet Service is Not Working' && (
            <p className="form-help-text">
              Before submitting, try our{' '}
              <a href="/support/troubleshooting#not-working">troubleshooting guide</a>.
              It resolves most connection issues in a few minutes. If you&apos;ve already
              tried those steps, let us know below.
            </p>
          )}
          {technicalIssue === 'My Internet and/or Wi-Fi is Slow' && (
            <p className="form-help-text">
              Before submitting, check our{' '}
              <a href="/support/troubleshooting#slow">slow speeds guide</a>.
              The most common cause is a past-due payment. If that&apos;s not the issue,
              let us know below what speeds you&apos;re seeing and whether you&apos;re on Wi-Fi or wired.
            </p>
          )}
          {technicalIssue === 'I forgot my Wi-Fi Password' && (
            <p className="form-help-text">
              <strong>Quick tip:</strong> Your default Wi-Fi password is usually your phone number
              with no spaces, dashes, or parentheses (e.g. 3045551234). Give that a try first.
              If that doesn&apos;t work, let us know below and we&apos;ll get you sorted out.
            </p>
          )}
          <div className="form-group">
            <label className="form-checkbox-label">
              <input type="checkbox" name="internetStillNotWorking" value="true" />
              <span>My internet is still not working after troubleshooting</span>
            </label>
          </div>
        </>
      )}

      {/* Conditional: Interested in Service */}
      {inquiryType === "I'm interested in Internet Service from my Home!" && (
        <>
          <p className="form-help-text">
            We currently serve areas across the Kanawha Valley (WV) and Danville (VA).{' '}
            <a href="/coverage">Check our coverage map</a> to see if your address is in our service area.
          </p>
          <div className="form-group">
            <label htmlFor="newServiceRequestAddress">Service Address</label>
            <input type="text" id="newServiceRequestAddress" name="newServiceRequestAddress" placeholder="123 Main St" required />
          </div>
          <div className="form-group">
            <label htmlFor="newServiceRequestCity">City</label>
            <input type="text" id="newServiceRequestCity" name="newServiceRequestCity" placeholder="South Charleston" required />
          </div>
        </>
      )}

      {/* Conditional: Billing */}
      {inquiryType === 'Billing Question' && (
        <p className="form-help-text">
          You can view your billing history, update payment methods, and enable autopay through your{' '}
          <a href="https://billing.securenetfiber.com" target="_blank" rel="noopener noreferrer">online billing portal</a>.
          If you still need help, let us know below.
        </p>
      )}

      {/* Conditional: Business Inquiry */}
      {inquiryType === 'Business Inquiry - Internet, Hosted Phones, Managed Services' && (
        <p className="form-help-text">
          SecureNet offers dedicated fiber internet, hosted phone systems, and managed IT services for businesses across our service area.
          Tell us about your needs below and a member of our team will follow up to schedule a consultation.
        </p>
      )}

      {/* Outside Fiber Concern */}
      {inquiryType === 'Outside Fiber Service Concern' && (
        <>
          <p className="form-help-text">
            If you need to share photos of an outside fiber concern, please email them to{' '}
            <a href="mailto:info@securenetfiber.com">info@securenetfiber.com</a> along with your address.
          </p>
          <div className="form-group">
            <label htmlFor="serviceAddress">Service Address</label>
            <input type="text" id="serviceAddress" name="serviceAddress" placeholder="123 Main St" />
          </div>
        </>
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
