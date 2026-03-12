import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="SecureNet Fiber home">
              <img src="/img/SN-Logo-Master.png" alt="SecureNet" height={36} />
            </Link>
            <p>Locally owned fiber internet.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <strong>Service</strong>
              <Link href="/residential/">Residential</Link>
              <Link href="/business/">Business</Link>
              <Link href="/coverage/">Coverage Areas</Link>
            </div>
            <div className="footer-col">
              <strong>Account</strong>
              <a href="https://billing.securenetfiber.com">Bill Pay</a>
              <a href="https://securenetfiber.com/service-request/">Sign Up</a>
            </div>
            <div className="footer-col">
              <strong>Company</strong>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <strong>Legal</strong>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Acceptable Use</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SecureNet Fiber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
