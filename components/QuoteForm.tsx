'use client';

import { useState, FormEvent } from 'react';

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3>Quote request received!</h3>
        <p>We'll put together a custom proposal and get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="quote-name">Name</label>
        <input type="text" id="quote-name" name="name" placeholder="Your name" autoComplete="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="quote-company">Company</label>
        <input type="text" id="quote-company" name="company" placeholder="Company name" autoComplete="organization" required />
      </div>
      <div className="form-group">
        <label htmlFor="quote-email">Email</label>
        <input type="email" id="quote-email" name="email" placeholder="you@company.com" autoComplete="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="quote-phone">Phone</label>
        <input type="tel" id="quote-phone" name="phone" placeholder="(304) 555-0100" autoComplete="tel" />
      </div>
      <div className="form-group">
        <label htmlFor="quote-message">How can we help?</label>
        <textarea id="quote-message" name="message" placeholder="Tell us about your business, what services you are interested in, and any questions you have." rows={5}></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">
        Request a Quote
      </button>
    </form>
  );
}
