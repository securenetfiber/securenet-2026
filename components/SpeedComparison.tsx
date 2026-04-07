'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const tiers = [
  { label: '500 Mbps', dl: 500, ul: 500 },
  { label: '1 Gig', dl: 1000, ul: 1000 },
  { label: '2 Gig', dl: 2000, ul: 2000 },
  { label: '5 Gig', dl: 5000, ul: 5000 },
];

const rivals = [
  { name: 'Optimum', type: 'Cable', dl: 400, ul: 20, ping: 32 },
  { name: 'Frontier', type: 'DSL / Fiber mix', dl: 115, ul: 10, ping: 45 },
  { name: 'Xfinity', type: 'Cable', dl: 500, ul: 35, ping: 28 },
];

function fmtSpeed(mbps: number) {
  if (mbps >= 1000) {
    const g = mbps / 1000;
    return (g % 1 === 0 ? g : g.toFixed(1)) + ' Gbps';
  }
  return mbps + ' Mbps';
}

function arcDash(pct: number) {
  return (Math.min(Math.max(pct, 0), 1) * 179).toFixed(1) + ' 179';
}

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  displayValue: string;
}

function Gauge({ value, max, label, displayValue, unit }: GaugeProps) {
  const pct = max > 0 ? value / max : 0;
  return (
    <div className="sc-gauge-wrap">
      <svg width="180" height="105" viewBox="0 0 130 76">
        <path d="M8,72 A57,57 0 0,1 122,72" fill="none" stroke="var(--bg-elevated)" strokeWidth="8" strokeLinecap="round" />
        <path d="M8,72 A57,57 0 0,1 122,72" fill="none" stroke="var(--navy)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={arcDash(pct)}
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)' }}
        />
        <text x="65" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--navy)" fontFamily="var(--font)">{displayValue}</text>
        <text x="65" y="73" textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font)">{unit}</text>
      </svg>
      <div className="sc-gauge-label">{label}</div>
    </div>
  );
}

interface ProviderData {
  name: string;
  type: string;
  featured?: boolean;
  dl: number;
  ul: number;
  ping: number;
}

function ProviderCard({ provider, maxDl }: { provider: ProviderData; maxDl: number }) {
  const dlPct = maxDl > 0 ? (provider.dl / maxDl) * 100 : 0;
  const ulPct = maxDl > 0 ? (provider.ul / maxDl) * 100 : 0;

  return (
    <div className={`sc-provider${provider.featured ? ' sc-provider--featured' : ''}`}>
      <div className="sc-provider-header">
        <div>
          <div className="sc-provider-name">{provider.name}</div>
          <div className="sc-provider-type">{provider.type}</div>
        </div>
        {provider.featured && <span className="sc-our-badge">Our network</span>}
      </div>
      <div className="sc-metrics">
        <div className="sc-metric">
          <div className="sc-metric-label">Download</div>
          <div className={`sc-metric-val${provider.featured ? ' sc-metric-val--good' : provider.dl < 200 ? ' sc-metric-val--bad' : ''}`}>
            {fmtSpeed(provider.dl)}
          </div>
        </div>
        <div className="sc-metric">
          <div className="sc-metric-label">Upload</div>
          <div className={`sc-metric-val${provider.featured ? ' sc-metric-val--good' : provider.ul < 50 ? ' sc-metric-val--bad' : ''}`}>
            {fmtSpeed(provider.ul)}
          </div>
        </div>
        <div className="sc-metric">
          <div className="sc-metric-label">Ping</div>
          <div className={`sc-metric-val${provider.featured ? ' sc-metric-val--good' : provider.ping > 20 ? ' sc-metric-val--bad' : ''}`}>
            {provider.ping} ms
          </div>
        </div>
      </div>
      <div className="sc-bar-row">
        <div className="sc-bar-label">Download</div>
        <div className="sc-bar-track">
          <div
            className="sc-bar-fill"
            style={{
              width: `${dlPct}%`,
              background: provider.featured ? 'var(--navy)' : 'var(--bg-elevated)',
            }}
          />
        </div>
      </div>
      <div className="sc-bar-row">
        <div className="sc-bar-label">Upload</div>
        <div className="sc-bar-track">
          <div
            className="sc-bar-fill"
            style={{
              width: `${ulPct}%`,
              background: provider.featured ? 'var(--accent)' : 'var(--bg-elevated)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SpeedComparison() {
  const [activeTier, setActiveTier] = useState(1);
  const [animDl, setAnimDl] = useState(0);
  const [animUl, setAnimUl] = useState(0);
  const [animMs, setAnimMs] = useState(60);
  const animRef = useRef<number | null>(null);

  const animateGauges = useCallback((targetDl: number, targetUl: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const dur = 900;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const ease = 1 - Math.pow(1 - Math.min(elapsed / dur, 1), 3);
      setAnimDl(Math.round(targetDl * ease));
      setAnimUl(Math.round(targetUl * ease));
      setAnimMs(Math.max(1, Math.round(1 + (60 - 1) * (1 - ease))));
      if (elapsed < dur) {
        animRef.current = requestAnimationFrame(tick);
      }
    }

    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const t = tiers[activeTier];
    animateGauges(t.dl, t.ul);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [activeTier, animateGauges]);

  const tier = tiers[activeTier];
  const securenet: ProviderData = {
    name: 'SecureNet Fiber', type: 'Fiber -- symmetrical', featured: true,
    dl: tier.dl, ul: tier.ul, ping: 1,
  };
  const allProviders = [securenet, ...rivals];
  const maxDl = Math.max(tier.dl, ...rivals.map(r => r.dl));

  const dlDisplay = animDl >= 1000
    ? ((animDl / 1000) % 1 === 0 ? String(animDl / 1000) : (animDl / 1000).toFixed(1))
    : String(animDl);
  const ulDisplay = animUl >= 1000
    ? ((animUl / 1000) % 1 === 0 ? String(animUl / 1000) : (animUl / 1000).toFixed(1))
    : String(animUl);

  return (
    <div className="sc-widget">
      <div className="sc-tier-row">
        {tiers.map((t, i) => (
          <button
            key={t.label}
            className={`sc-tier-btn${i === activeTier ? ' sc-tier-btn--active' : ''}`}
            onClick={() => setActiveTier(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="sc-gauges">
        <Gauge value={animDl} max={tier.dl} label="Download" displayValue={dlDisplay} unit={animDl >= 1000 ? 'Gbps' : 'Mbps'} />
        <Gauge value={animUl} max={tier.ul} label="Upload" displayValue={ulDisplay} unit={animUl >= 1000 ? 'Gbps' : 'Mbps'} />
        <Gauge value={60 - animMs} max={60} label="Latency" displayValue={String(animMs)} unit="ms ping" />
      </div>

      <div className="sc-badge-row">
        <span className="sc-badge sc-badge--navy"><span className="sc-badge-dot"></span>Symmetrical speeds</span>
        <span className="sc-badge sc-badge--navy"><span className="sc-badge-dot"></span>No data caps</span>
        <span className="sc-badge sc-badge--accent"><span className="sc-badge-dot"></span>Local infrastructure</span>
      </div>

      <div className="sc-section-label">How we compare</div>
      <div className="sc-compare-grid">
        {allProviders.map((p) => (
          <ProviderCard key={p.name} provider={p} maxDl={maxDl} />
        ))}
      </div>
    </div>
  );
}
