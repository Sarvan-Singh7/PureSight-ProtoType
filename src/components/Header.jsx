import { useState, useEffect } from 'react';

export default function Header({ location, deviceId }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const ss = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-wrap">
          {/* Inline SVG recreation of PureSight logo mark */}
          <svg className="logo-icon" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Droplet Outline */}
            <path d="M42 12C42 12 12 48 12 71C12 88.5 25.5 102 42 102C58.5 102 72 88.5 72 71C72 48 42 12 42 12Z" 
                  stroke="#0c7a73" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Liquid Wave Fill Inside */}
            <path d="M17 74C23 68 31 68 37 74C43 80 51 80 57 74C63 68 66 69 67.5 71C67.5 83 62 96 42 96C22 96 17 83 17 74Z" 
                  fill="#0c7a73" />
            {/* Wireless Signal Central Dot */}
            <circle cx="60" cy="46" r="5" fill="#0c7a73" />
            {/* Concentric Signal Arcs (Wi-Fi/IoT) */}
            <path d="M72 38C78.5 44.5 82.5 53 82.5 62" stroke="#0c7a73" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M83 27C92.5 36.5 98.5 48.5 98.5 62" stroke="#0c7a73" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M94 16C106.5 28.5 114 44.5 114 62" stroke="#0c7a73" strokeWidth="5.5" strokeLinecap="round" />
          </svg>
          <div className="logo-text">
            <span className="logo-name">PureSight</span>
            <span className="logo-tagline">by Shreshthtam</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="location-badge">
          <span className="location-icon">📍</span>
          <span className="location-text">{location}</span>
        </div>
        <div className="device-id">Device ID: {deviceId}</div>
      </div>

      <div className="header-right">
        <div className="live-dot-wrap">
          <span className="live-dot" />
          <span className="live-label">LIVE</span>
        </div>
        <div className="clock">
          <div className="clock-time">{hh}:{mm}:{ss}</div>
          <div className="clock-date">{dateStr}</div>
        </div>
      </div>
    </header>
  );
}
