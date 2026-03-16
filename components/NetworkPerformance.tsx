'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { value: '99.98%', label: 'Network Uptime' },
  { value: '2.4 ms', label: 'Avg Latency' },
  { value: '99.99%', label: 'Packet Delivery' },
  { value: '5 Gbps', label: 'Peak Throughput' },
];

const MARKETS = [
  {
    region: 'Kanawha Valley, WV',
    uptime: '99.98%',
    uptimePct: 99.98,
    latency: '2.4 ms',
  },
  {
    region: 'Danville, VA',
    uptime: '99.97%',
    uptimePct: 99.97,
    latency: '2.8 ms',
  },
];

const BADGES = [
  { icon: '\u26A1', text: 'Symmetrical upload and download' },
  { icon: '\uD83D\uDEAB', text: 'No throttling, ever' },
  { icon: '\uD83D\uDCCD', text: 'Locally owned and operated' },
  { icon: '\uD83D\uDD12', text: 'No data caps' },
  { icon: '\uD83D\uDEE0\uFE0F', text: 'Local support team' },
  { icon: '\uD83C\uDF10', text: 'Pure fiber to the home' },
];

export default function NetworkPerformance() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;

          // Animate uptime bars
          section.querySelectorAll<HTMLElement>('.net-perf-bar-fill').forEach((bar) => {
            const pct = bar.dataset.pct;
            if (pct) {
              bar.style.width = `${parseFloat(pct)}%`;
            }
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="net-perf" ref={sectionRef}>
      <div className="section-container">
        <h2 className="net-perf-heading">Network performance.</h2>
        <p className="net-perf-sub">
          Real numbers from our fiber network -- not promises, not &quot;up to&quot; speeds.
        </p>

        {/* Top-level stats */}
        <div className="net-perf-stats">
          {STATS.map((s) => (
            <div className="net-perf-stat" key={s.label}>
              <span className="net-perf-stat-value">{s.value}</span>
              <span className="net-perf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Per-market cards */}
        <div className="net-perf-markets">
          {MARKETS.map((m) => (
            <div className="net-perf-market" key={m.region}>
              <div className="net-perf-market-region">{m.region}</div>
              <div className="net-perf-market-row">
                <div>
                  <div className="net-perf-market-metric-value">{m.uptime}</div>
                  <div className="net-perf-market-metric-label">Uptime (30d)</div>
                </div>
                <div>
                  <div className="net-perf-market-metric-value">{m.latency}</div>
                  <div className="net-perf-market-metric-label">Avg Latency</div>
                </div>
              </div>
              <div className="net-perf-bar-track">
                <div className="net-perf-bar-fill" data-pct={m.uptimePct}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature badges */}
        <div className="net-perf-badges">
          {BADGES.map((b) => (
            <div className="net-perf-badge" key={b.text}>
              <span className="net-perf-badge-icon">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}