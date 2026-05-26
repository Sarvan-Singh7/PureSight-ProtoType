/**
 * WaterAnimation — purely CSS animated background.
 * Floating translucent particles that give a "live water" feel.
 * Zero JS, zero performance impact.
 */
export default function WaterAnimation() {
  const particles = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="water-bg" aria-hidden="true">
      {particles.map(i => (
        <div
          key={i}
          className="water-particle"
          style={{
            left: `${(i * 5.5 + 3) % 100}%`,
            animationDelay: `${(i * 0.7) % 6}s`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            width: `${6 + (i % 4) * 4}px`,
            height: `${6 + (i % 4) * 4}px`,
            opacity: 0.06 + (i % 3) * 0.02,
          }}
        />
      ))}
      {/* Scanline overlay for hardware-monitor aesthetic */}
      <div className="scanline-overlay" />
    </div>
  );
}
