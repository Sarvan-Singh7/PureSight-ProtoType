export default function UVStatus({ uvActive, uptime }) {
  const health = uvActive ? 'safe' : 'danger';

  return (
    <div className={`uv-card uv-card--${health}`}>
      <div className="uv-header">
        <span className="uv-title">UV Lamp</span>
        <span className={`uv-badge uv-badge--${health}`}>
          {uvActive ? 'ACTIVE' : 'FAILED'}
        </span>
      </div>

      {/* Animated UV ring */}
      <div className="uv-ring-wrap">
        <div className={`uv-ring ${uvActive ? 'uv-ring--pulse' : 'uv-ring--dead'}`}>
          <div className="uv-ring-inner">
            <span className="uv-icon">{uvActive ? '◉' : '○'}</span>
          </div>
        </div>
      </div>

      <div className="uv-meta">
        <div className="uv-status-text">
          {uvActive ? 'Sterilising water' : 'Replace UV lamp immediately'}
        </div>
        <div className="uv-uptime">Uptime: {uptime}%</div>
      </div>
    </div>
  );
}
