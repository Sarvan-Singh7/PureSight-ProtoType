import './index.css';
import './App.css';

import { useSimulatedData } from './hooks/useSimulatedData';
import { computeOverallStatus } from './utils/statusLogic';

import Header from './components/Header';
import StatusHero from './components/StatusHero';
import MetricsGrid from './components/MetricsGrid';
import FooterBar from './components/FooterBar';
import WaterAnimation from './components/WaterAnimation';

export default function App() {
  const data = useSimulatedData();

  const status = computeOverallStatus({
    tds: data.tds,
    turbidity: data.turbidity,
    uvActive: data.uvActive,
    filterLife: data.filterLife,
    filterAuthentic: data.filterAuthentic,
  });

  return (
    <div className="app-shell">
      {/* Animated water background — purely decorative */}
      <WaterAnimation />

      {/* ── Header ── */}
      <Header
        location={data.location}
        deviceId={data.deviceId}
      />

      {/* ── Main content ── */}
      <main className="app-main">
        {/* Left: Big SAFE / WARNING / DANGER verdict */}
        <StatusHero status={status} />

        {/* Right: All metric cards, filter, UV, flow strip */}
        <MetricsGrid data={data} />
      </main>

      {/* ── Footer ── */}
      <FooterBar
        lastUpdated={new Date()}
        scenario={data.scenario}
      />
    </div>
  );
}
