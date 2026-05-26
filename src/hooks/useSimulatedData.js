import { useState, useEffect, useRef } from 'react';

/** Small random fluctuation within ±range around a base value */
function fluctuate(base, range, min, max) {
  const delta = (Math.random() - 0.5) * 2 * range;
  return Math.min(max, Math.max(min, +(base + delta).toFixed(2)));
}

/**
 * useSimulatedData
 * Simulates a realistic IoT sensor data feed.
 * Updates every 3 seconds with micro-fluctuations.
 * Every ~40 seconds it cycles through a WARNING scenario for demo purposes.
 */
export function useSimulatedData() {
  const cycleRef = useRef(0);
  const filterLifeRef = useRef(78); // starts at 78% filter life

  const getInitialData = () => ({
    tds: 42,
    turbidity: 0.38,
    temperature: 26.1,
    filterLife: filterLifeRef.current,
    uvActive: true,
    filterAuthentic: true,
    flowRate: 1.8,
    totalLitresFiltered: 4820,
    lastFilterChange: '12 Mar 2025',
    lastMaintenance: '01 May 2025',
    serviceContractor: 'PureSight Services',
    location: 'Block B — Ground Floor',
    deviceId: 'PS-2024-0047',
    uptime: 99.4,
    scenario: 'SAFE', // 'SAFE' | 'WARNING_TDS' | 'WARNING_FILTER' | 'DANGER_UV'
  });

  const [data, setData] = useState(getInitialData);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleRef.current += 1;
      const tick = cycleRef.current;

      // Demo scenario cycling: every 15 ticks (~45s) rotate through states
      let scenario = 'SAFE';
      const phase = Math.floor(tick / 15) % 4;
      if (phase === 1) scenario = 'WARNING_TDS';
      else if (phase === 2) scenario = 'WARNING_FILTER';
      else if (phase === 3) scenario = 'DANGER_UV';

      // Slowly deplete filter life
      filterLifeRef.current = Math.max(0, filterLifeRef.current - 0.02);

      setData(prev => {
        let tds, turbidity, temperature, uvActive, filterAuthentic, filterLife;

        filterLife = +filterLifeRef.current.toFixed(1);

        if (scenario === 'SAFE') {
          tds = fluctuate(42, 3, 20, 149);
          turbidity = fluctuate(0.38, 0.05, 0.1, 0.99);
          temperature = fluctuate(26.1, 0.3, 18, 29);
          uvActive = true;
          filterAuthentic = true;
        } else if (scenario === 'WARNING_TDS') {
          tds = fluctuate(162, 5, 151, 280);
          turbidity = fluctuate(0.6, 0.05, 0.3, 0.99);
          temperature = fluctuate(27.2, 0.3, 18, 29);
          uvActive = true;
          filterAuthentic = true;
        } else if (scenario === 'WARNING_FILTER') {
          tds = fluctuate(55, 3, 30, 140);
          turbidity = fluctuate(0.45, 0.05, 0.2, 0.99);
          temperature = fluctuate(26.5, 0.3, 18, 29);
          uvActive = true;
          filterAuthentic = true;
          filterLife = Math.min(filterLife, 12); // force low filter
        } else if (scenario === 'DANGER_UV') {
          tds = fluctuate(50, 3, 30, 140);
          turbidity = fluctuate(0.42, 0.05, 0.2, 0.99);
          temperature = fluctuate(26.1, 0.3, 18, 29);
          uvActive = false; // UV lamp failure
          filterAuthentic = true;
        }

        return {
          ...prev,
          tds,
          turbidity,
          temperature,
          filterLife,
          uvActive,
          filterAuthentic,
          flowRate: fluctuate(1.8, 0.1, 1.4, 2.2),
          totalLitresFiltered: prev.totalLitresFiltered + +(Math.random() * 0.05).toFixed(3),
          scenario,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
