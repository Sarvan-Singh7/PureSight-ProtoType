import { getStatusLabel } from '../utils/statusLogic';

export default function StatusHero({ status }) {
  const { headline, subtext, emoji } = getStatusLabel(status);

  return (
    <div className={`status-hero status-hero--${status.toLowerCase()}`}>
      {/* Animated water drop background */}
      <div className="hero-drop-bg">
        <div className="drop-ring drop-ring--1" />
        <div className="drop-ring drop-ring--2" />
        <div className="drop-ring drop-ring--3" />
      </div>

      {/* Big status icon */}
      <div className="hero-emoji-wrap">
        <div className={`hero-emoji hero-emoji--${status.toLowerCase()}`}>
          {emoji}
        </div>
      </div>

      {/* Status text */}
      <div className="hero-text">
        <div className="hero-status-label">{status}</div>
        <div className="hero-headline">{headline}</div>
        <div className="hero-subtext">{subtext}</div>
      </div>

      {/* WHO Certified badge */}
      <div className="hero-badge">
        <span className="badge-icon">🛡</span>
        <span className="badge-text">WHO Standards Monitored</span>
      </div>
    </div>
  );
}
