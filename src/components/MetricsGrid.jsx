import MetricCard from './MetricCard';
import FilterStatus from './FilterStatus';
import UVStatus from './UVStatus';
import {
  getMetricHealth,
  TDS_THRESHOLDS,
  TURBIDITY_THRESHOLDS,
  TEMP_THRESHOLDS,
} from '../utils/statusLogic';

export default function MetricsGrid({ data }) {
  const tdsHealth = getMetricHealth(data.tds, TDS_THRESHOLDS);
  const turbHealth = getMetricHealth(data.turbidity, TURBIDITY_THRESHOLDS);
  const tempHealth = getMetricHealth(data.temperature, TEMP_THRESHOLDS);

  const getTDSSublabel = (tds) => {
    if (tds < 50) return 'Excellent';
    if (tds < 150) return 'Good — Safe';
    if (tds < 300) return 'Elevated — Monitor';
    return 'Unsafe — Too High';
  };

  const getTurbSublabel = (t) => {
    if (t < 0.5) return 'Crystal Clear';
    if (t < 1.0) return 'Acceptable';
    if (t < 4.0) return 'Cloudy — Check Filter';
    return 'Unsafe — High Turbidity';
  };

  return (
    <div className="metrics-grid">
      {/* Top row: 3 live readings */}
      <div className="metrics-row-top">
        <MetricCard
          icon="💧"
          label="TDS"
          value={data.tds.toFixed(1)}
          unit="ppm"
          health={tdsHealth}
          sublabel={getTDSSublabel(data.tds)}
        />
        <MetricCard
          icon="🌡"
          label="Temperature"
          value={data.temperature.toFixed(1)}
          unit="°C"
          health={tempHealth}
          sublabel={data.temperature < 30 ? 'Optimal Range' : 'Too Warm'}
        />
        <MetricCard
          icon="👁"
          label="Turbidity"
          value={data.turbidity.toFixed(2)}
          unit="NTU"
          health={turbHealth}
          sublabel={getTurbSublabel(data.turbidity)}
        />
      </div>

      {/* Bottom row: filter + UV */}
      <div className="metrics-row-bottom">
        <FilterStatus
          filterLife={data.filterLife}
          filterAuthentic={data.filterAuthentic}
        />
        <UVStatus uvActive={data.uvActive} uptime={data.uptime} />
      </div>

      {/* Flow info strip */}
      <div className="flow-strip">
        <div className="flow-item">
          <span className="flow-icon">〰</span>
          <span className="flow-label">Flow Rate</span>
          <span className="flow-val">{data.flowRate.toFixed(2)} L/min</span>
        </div>
        <div className="flow-divider" />
        <div className="flow-item">
          <span className="flow-icon">📊</span>
          <span className="flow-label">Total Filtered</span>
          <span className="flow-val">{data.totalLitresFiltered.toFixed(0)} L</span>
        </div>
        <div className="flow-divider" />
        <div className="flow-item">
          <span className="flow-icon">🔧</span>
          <span className="flow-label">Last Service</span>
          <span className="flow-val">{data.lastMaintenance}</span>
        </div>
        <div className="flow-divider" />
        <div className="flow-item">
          <span className="flow-icon">👷</span>
          <span className="flow-label">Contractor</span>
          <span className="flow-val">{data.serviceContractor}</span>
        </div>
      </div>
    </div>
  );
}
