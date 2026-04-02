import type { Plan } from '@/lib/plans';

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}>
      {plan.badge && <div className="plan-badge">{plan.badge}</div>}
      <div className="plan-name">{plan.name}</div>
      <div className="plan-speed">
        {plan.speed} <span>{plan.speedUnit}</span>
      </div>
      <div className="plan-price">
        <span className="price-dollar">$</span>
        <span className="price-amount">{plan.price}</span>
        <span className="price-period">/mo</span>
      </div>
      <ul className="plan-features">
        {plan.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <a
        href={plan.ctaHref || '/service-request'}
        className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-full`}
      >
        {plan.ctaText || 'Get Started'}
      </a>
    </div>
  );
}
