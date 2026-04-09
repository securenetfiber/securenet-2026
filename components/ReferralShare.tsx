'use client';

import { useState } from 'react';

interface ReferralShareProps {
  code: string;
  shareUrl: string;
}

export default function ReferralShare({ code, shareUrl }: ReferralShareProps) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `Check out SecureNet Fiber! Use my referral link and we both get a free month of internet: ${shareUrl}`;

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="ref-share">
      <div className="ref-code-display">
        <span className="ref-code-label">Your referral code</span>
        <span className="ref-code-value">{code}</span>
      </div>

      <div className="ref-link-row">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="ref-link-input"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button className="btn btn-primary ref-copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      <div className="ref-share-actions">
        <a
          href={`sms:?body=${encodeURIComponent(shareMessage)}`}
          className="ref-share-btn ref-share-btn--sms"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Text a Friend
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent('Get a free month of SecureNet Fiber!')}&body=${encodeURIComponent(shareMessage)}`}
          className="ref-share-btn ref-share-btn--email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Email
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ref-share-btn ref-share-btn--facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </a>
      </div>
    </div>
  );
}
