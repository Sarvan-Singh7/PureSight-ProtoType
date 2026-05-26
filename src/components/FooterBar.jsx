import { useState, useEffect } from 'react';

const ALERTS = [
  'Filter replaced on 12 Mar 2025 by PureSight Services  •  ',
  'UV lamp last tested: 01 May 2025 — PASS  •  ',
  'PureSight device certified under FSSAI water safety norms  •  ',
  'All data is logged and tamper-proof on secure cloud  •  ',
  'Next scheduled maintenance: 01 Aug 2025  •  ',
];

export default function FooterBar({ lastUpdated, scenario }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = lastUpdated.toLocaleTimeString('en-IN', { hour12: false });

  const scenarioLabel = {
    SAFE: null,
    WARNING_TDS: '⚠ HIGH TDS DETECTED — Water may taste salty. Contact maintenance.',
    WARNING_FILTER: '⚠ FILTER LIFE LOW — Schedule filter replacement immediately.',
    DANGER_UV: '🚨 UV LAMP FAILURE — Do not drink. Facility staff notified.',
  }[scenario];

  return (
    <footer className="footer-bar">
      <div className="footer-left">
        <span className="footer-updated">
          <span className="footer-dot" />
          Last updated: <strong>{timeStr}</strong>
        </span>
      </div>

      <div className="footer-ticker-wrap">
        {scenarioLabel ? (
          <div className="footer-alert-banner">{scenarioLabel}</div>
        ) : (
          <div className="footer-ticker">
            <div className="footer-ticker-inner">
              {[...ALERTS, ...ALERTS].join('')}
            </div>
          </div>
        )}
      </div>

      <div className="footer-right">
        <span className="footer-cert">
          🏅 PureSight Certified
        </span>
        <span className="footer-brand">Shreshthtam © 2025</span>
      </div>
    </footer>
  );
}
