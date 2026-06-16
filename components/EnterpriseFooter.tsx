import Link from 'next/link';

export default function EnterpriseFooter() {
  return (
    <footer className="ent-footer">
      <div className="section-container">
        <div className="ent-footer-top">
          <div className="ent-footer-brand">
            <Link href="/enterprise" className="ent-logo" aria-label="SecureNet Enterprise home">
              <img src="/img/White-NoTagline.png" alt="SecureNet" height={28} />
              <span className="ent-logo-label">Enterprise</span>
            </Link>
            <p>Enterprise fiber and managed services for the Kanawha Valley and Danville, VA.</p>
          </div>
          <div className="ent-footer-links">
            <div className="ent-footer-col">
              <strong>Services</strong>
              <Link href="/enterprise/services/connectivity">Connectivity</Link>
              <Link href="/enterprise/services/security">Security</Link>
              <Link href="/enterprise/services/communications">Communications</Link>
              <Link href="/enterprise/services/video">Video</Link>
            </div>
            <div className="ent-footer-col">
              <strong>Company</strong>
              <Link href="/enterprise/clients">Who We Work With</Link>
              <Link href="/enterprise/why-securenet">Why SecureNet</Link>
              <Link href="/enterprise/contact">Contact</Link>
              <Link href="/">SecureNet Home</Link>
            </div>
            <div className="ent-footer-col">
              <strong>Get in Touch</strong>
              <a href="tel:+13047444667">(304) 744-4667</a>
              <a href="mailto:enterprise@securenetfiber.com">enterprise@securenetfiber.com</a>
            </div>
          </div>
        </div>
        <div className="ent-footer-bottom">
          <p>&copy; 2026 SecureNet Fiber. All rights reserved.</p>
          <div className="ent-footer-legal">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
