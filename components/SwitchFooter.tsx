import { COMPANY_INFO } from '@/lib/plans';
import { SWITCH_COPY } from '@/lib/switch-copy';

// Minimal footer for /switch: logo, legal links, copyright. No site nav.
export default function SwitchFooter() {
  return (
    <footer className="site-footer switch-footer">
      <div className="section-container">
        <div className="switch-footer-top">
          <img src="/img/SN-Logo-Master.png" alt="SecureNet" height={36} className="switch-footer-logo" />
          <div className="switch-footer-legal">
            <a href={COMPANY_INFO.policyUrls.privacy}>{SWITCH_COPY.footer.privacy}</a>
            <a href={COMPANY_INFO.policyUrls.terms}>{SWITCH_COPY.footer.terms}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{SWITCH_COPY.footer.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
