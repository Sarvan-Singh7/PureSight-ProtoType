/**
 * MetricCard — reusable tile for a single sensor reading.
 * Props: icon, label, value, unit, health ('safe'|'warning'|'danger'), sublabel
 */
export default function MetricCard({ icon, label, value, unit, health, sublabel }) {
  return (
    <div className={`metric-card metric-card--${health}`}>
      <div className="metric-header">
        <span className="metric-icon">{icon}</span>
        <span className="metric-label">{label}</span>
        <span className={`metric-dot metric-dot--${health}`} />
      </div>
      <div className="metric-value-row">
        <span className="metric-value">{value}</span>
        <span className="metric-unit">{unit}</span>
      </div>
      {sublabel && <div className="metric-sublabel">{sublabel}</div>}
    </div>
  );
}
