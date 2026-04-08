import type { Plan } from '@/lib/plans';
import { COMPANY_INFO } from '@/lib/plans';
import Link from 'next/link';

export default function BroadbandLabel({ plan }: { plan: Plan }) {
  return (
    <div
      className="broadband-label"
      role="region"
      aria-label={`Broadband Facts for ${plan.name}`}
    >
      {/* Header */}
      <div className="bb-header">
        <strong className="bb-title">Broadband Facts</strong>
        <span className="bb-plan-id">{plan.fccId}</span>
      </div>

      {/* Plan name + price */}
      <div className="bb-plan-row">
        <span className="bb-plan-name">
          {COMPANY_INFO.name} &mdash; {plan.name}
        </span>
        <span className="bb-plan-price">${plan.price}/mo</span>
      </div>

      {/* Speeds & Latency */}
      <div className="bb-section">
        <div className="bb-section-title">Typical Speeds &amp; Latency</div>
        <div className="bb-row">
          <span>Download</span>
          <strong>{plan.typicalDownload} Mbps</strong>
        </div>
        <div className="bb-row">
          <span>Upload</span>
          <strong>{plan.typicalUpload} Mbps</strong>
        </div>
        <div className="bb-row">
          <span>Latency (idle)</span>
          <strong>{plan.typicalLatency} ms</strong>
        </div>
      </div>

      {/* Data */}
      <div className="bb-section">
        <div className="bb-section-title">Monthly Data Allowance</div>
        <div className="bb-row">
          <span>Data Included</span>
          <strong>{plan.dataAllowance}</strong>
        </div>
        <div className="bb-row">
          <span>Overage Charges</span>
          <strong>None</strong>
        </div>
      </div>

      {/* Fees */}
      <div className="bb-section">
        <div className="bb-section-title">Fees</div>
        <div className="bb-row">
          <span>Monthly Price</span>
          <strong>${plan.price}/mo</strong>
        </div>
        {plan.fees.map((fee, i) => (
          <div className="bb-row" key={i}>
            <span>
              {fee.name}
              {fee.note && <em className="bb-note"> ({fee.note})</em>}
            </span>
            <strong>
              {fee.amount === 0 ? 'Free' : `$${fee.amount}`}
              {fee.frequency === 'monthly' && '/mo'}
            </strong>
          </div>
        ))}
      </div>

      {/* Contract */}
      <div className="bb-section">
        <div className="bb-row">
          <span>Contract Required</span>
          <strong>{plan.contractRequired ? 'Yes' : 'No'}</strong>
        </div>
        <div className="bb-row">
          <span>Early Termination Fee</span>
          <strong>None</strong>
        </div>
      </div>

      {/* Footer links */}
      <div className="bb-footer">
        <Link href={COMPANY_INFO.policyUrls.privacy}>Privacy Policy</Link>
        <span className="bb-sep">&bull;</span>
        <Link href={COMPANY_INFO.policyUrls.acceptableUse}>Network Management</Link>
        <span className="bb-sep">&bull;</span>
        <Link href="/contact">Customer Support</Link>
      </div>
    </div>
  );
}
