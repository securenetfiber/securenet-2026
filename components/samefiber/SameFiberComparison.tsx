import { SAME_FIBER, type SameFiberPlan } from '@/lib/samefiber';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';

const t = SAME_FIBER_COPY.comparison;

/** Price comparison. Renders nothing when SAME_FIBER.competitor is null. */
export default function SameFiberComparison({
  plans,
  onChoose,
}: {
  plans: SameFiberPlan[];
  onChoose: (plan: SameFiberPlan) => void;
}) {
  const competitor = SAME_FIBER.competitor;
  const rows = plans.filter((p) => p.competitorPrice !== null && p.yearlySavings !== null);
  if (!competitor || rows.length === 0) return null;

  return (
    <section className="sf-compare">
      <div className="section-container">
        <h2 className="section-heading">{t.heading}</h2>
        <div className="sf-compare-table" role="table" aria-label={t.heading}>
          <div className="sf-compare-row sf-compare-row--head" role="row">
            <span role="columnheader">{t.speedHeader}</span>
            <span role="columnheader">{t.competitorHeader(competitor.name)}</span>
            <span role="columnheader">{t.ourHeader}</span>
            <span role="columnheader" className="sf-compare-action-head" aria-hidden="true" />
          </div>
          {rows.map((p) => (
            <div className="sf-compare-row" role="row" key={p.planId}>
              <span role="cell" className="sf-compare-speed">{p.speedLabel}</span>
              <span role="cell" className="sf-compare-them">
                <span className="sf-compare-label">{t.competitorHeader(competitor.name)}</span>
                <s>${p.competitorPrice}{t.perMonth}</s>
              </span>
              <span role="cell" className="sf-compare-us">
                <span className="sf-compare-label">{t.ourHeader}</span>
                <strong>${p.price}{t.perMonth}</strong>
              </span>
              <span role="cell" className="sf-compare-action">
                <span className="sf-compare-savings">{t.savings(p.yearlySavings as number)}</span>
                <button type="button" className="btn btn-primary" onClick={() => onChoose(p)}>
                  {t.button(p.speedLabel)}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
