import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: 'Network Status',
  description:
    'Real-time network status for SecureNet Fiber. Check uptime, latency, and active incidents across all service areas.',
};

/* Placeholder data -- easy to swap for a live API later */
const STATUS = {
  overall: 'operational' as const,
  updatedAt: new Date().toISOString(),
  markets: [
    {
      name: 'Kanawha Valley, WV',
      status: 'operational' as const,
      uptime: 99.98,
      latency: 2.4,
    },
    {
      name: 'Danville, VA',
      status: 'operational' as const,
      uptime: 99.97,
      latency: 2.8,
    },
  ],
  incidents: [] as { title: string; date: string; detail: string }[],
};

const statusLabel: Record<string, string> = {
  operational: 'All Systems Operational',
  degraded: 'Degraded Performance',
  outage: 'Service Outage',
};

const dotClass: Record<string, string> = {
  operational: 'status-dot--operational',
  degraded: 'status-dot--degraded',
  outage: 'status-dot--outage',
};

export default function StatusPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Network Status' }]} />

      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">
          <h1 className="section-heading">Network Status</h1>
          <p className="section-sub">
            Current performance and incident reports for the SecureNet Fiber
            network.
          </p>
        </div>
      </section>

      {/* OVERALL STATUS BANNER */}
      <section className="status-overview">
        <div className="section-container">
          <div className={`status-banner status-banner--${STATUS.overall}`}>
            <span className={`status-dot ${dotClass[STATUS.overall]}`} />
            <span className="status-banner-text">{statusLabel[STATUS.overall]}</span>
          </div>
        </div>
      </section>

      {/* MARKET CARDS */}
      <section className="status-markets">
        <div className="section-container">
          <h2 className="section-heading">Service areas.</h2>
          <p className="section-sub" style={{ marginBottom: 'var(--space-xl)' }}>
            Per-market performance metrics.
          </p>

          <div className="benefit-grid">
            {STATUS.markets.map((m) => (
              <div className="benefit-card" key={m.name}>
                <div className="market-header">
                  <span className={`status-dot ${dotClass[m.status]}`} />
                  <h3>{m.name}</h3>
                </div>
                <div className="market-metrics market-metrics--two">
                  <div className="market-metric">
                    <span className="market-metric-value">{m.uptime}%</span>
                    <span className="market-metric-label">Uptime (30d)</span>
                  </div>
                  <div className="market-metric">
                    <span className="market-metric-value">{m.latency} ms</span>
                    <span className="market-metric-label">Avg Latency</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCIDENTS */}
      <section className="status-incidents">
        <div className="section-container">
          <h2 className="section-heading">Active incidents.</h2>
          {STATUS.incidents.length === 0 ? (
            <div className="incidents-empty">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p>No active incidents. All systems are running normally.</p>
            </div>
          ) : (
            <div className="incidents-list">
              {STATUS.incidents.map((inc, i) => (
                <div className="benefit-card" key={i}>
                  <h3>{inc.title}</h3>
                  <p><strong>{inc.date}</strong> &mdash; {inc.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
