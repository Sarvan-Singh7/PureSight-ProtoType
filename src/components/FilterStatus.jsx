import { estimateFilterDays } from '../utils/statusLogic';

export default function FilterStatus({ filterLife, filterAuthentic }) {
  const days = estimateFilterDays(filterLife);
  const health = filterAuthentic
    ? filterLife < 15 ? 'danger' : filterLife < 30 ? 'warning' : 'safe'
    : 'danger';

  const barWidth = Math.max(0, Math.min(100, filterLife));

  return (
    <div className={`filter-card filter-card--${health}`}>
      <div className="filter-header">
        <span className="filter-icon">🔩</span>
        <span className="filter-title">Filter Health</span>
        <span className={`filter-pct filter-pct--${health}`}>{filterLife.toFixed(1)}%</span>
      </div>

      {/* Progress bar */}
      <div className="filter-bar-track">
        <div
          className={`filter-bar-fill filter-bar-fill--${health}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="filter-meta">
        <span className="filter-days">~{days} days remaining</span>
        <span className={`filter-auth filter-auth--${filterAuthentic ? 'ok' : 'fraud'}`}>
          {filterAuthentic ? '✓ Genuine Filter Verified' : '✕ FRAUD DETECTED'}
        </span>
      </div>
    </div>
  );
}
