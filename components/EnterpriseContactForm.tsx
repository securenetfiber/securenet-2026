'use client';

import { useState } from 'react';

export default function EnterpriseContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/enterprise-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="ent-form-success">
        <h3>Message sent.</h3>
        <p>
          We&rsquo;ll get back to you within one business day. If you need
          something sooner, call us at{' '}
          <a href="tel:+13047444667">(304) 744-4667</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ent-form">
      <div className="ent-form-row">
        <div className="ent-form-group">
          <label htmlFor="ent-name">Name</label>
          <input type="text" id="ent-name" name="name" required autoComplete="name" />
        </div>
        <div className="ent-form-group">
          <label htmlFor="ent-company">Company</label>
          <input type="text" id="ent-company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="ent-form-group">
        <label htmlFor="ent-phone">Phone</label>
        <input type="tel" id="ent-phone" name="phone" autoComplete="tel" />
      </div>
      <div className="ent-form-group">
        <label htmlFor="ent-message">What do you need?</label>
        <textarea id="ent-message" name="message" rows={4} required />
      </div>
      <button type="submit" className="btn ent-btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="ent-form-error">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}
