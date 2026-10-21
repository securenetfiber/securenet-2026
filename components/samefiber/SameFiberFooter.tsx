import { COMPANY_INFO } from '@/lib/plans';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';

// Minimal footer for /danville-fiber: logo, legal links, copyright. No site nav.
export default function SameFiberFooter() {
  return (
    <footer className="site-footer sf-footer">
      <div className="section-container">
        <div className="sf-footer-top">
          <img src="/img/SN-Logo-Master.png" alt="SecureNet" height={36} className="sf-footer-logo" />
          <div className="sf-footer-legal">
            <a href={COMPANY_INFO.policyUrls.privacy}>{SAME_FIBER_COPY.footer.privacy}</a>
            <a href={COMPANY_INFO.policyUrls.terms}>{SAME_FIBER_COPY.footer.terms}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{SAME_FIBER_COPY.footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
