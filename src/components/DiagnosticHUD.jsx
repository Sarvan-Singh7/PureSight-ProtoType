import { useState, useEffect, useRef } from 'react';

export default function DiagnosticHUD({ data, status, onClose }) {
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Generate mock serial diagnostic terminal logs based on current live data
  useEffect(() => {
    const generateLog = () => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLogs = [];

      if (status === 'SAFE') {
        newLogs.push(`[${timeStr}] TDS_SENS: Probe read = ${data.tds.toFixed(1)} ppm (${(data.tds * 0.02 + 0.4).toFixed(3)}V)`);
        newLogs.push(`[${timeStr}] FLOW_CTRL: Meter frequency = ${(data.flowRate * 18.5).toFixed(1)} Hz, rate = ${data.flowRate.toFixed(2)} L/min`);
        newLogs.push(`[${timeStr}] SYSTEM: Solenoid valve RELAY_1 = [ACTIVE_OPEN]`);
        if (Math.random() > 0.6) {
          newLogs.push(`[${timeStr}] RFID_DECODER: Transponder UID 0x4B3A88F1 verified genuine`);
        }
      } else if (status === 'WARNING') {
        if (data.scenario === 'WARNING_TDS') {
          newLogs.push(`[${timeStr}] WARNING: TDS sensor threshold exceeded (${data.tds.toFixed(1)} ppm)`);
          newLogs.push(`[${timeStr}] TDS_SENS: Probe output peak volt = ${(data.tds * 0.02 + 0.4).toFixed(3)}V`);
        } else if (data.scenario === 'WARNING_FILTER') {
          newLogs.push(`[${timeStr}] CAUTION: Filter media volume at limit (${data.filterLife.toFixed(1)}%)`);
          newLogs.push(`[${timeStr}] SECURE_EEPROM: Write lifecycle counter incremented`);
        }
      } else if (status === 'DANGER') {
        if (!data.uvActive) {
          newLogs.push(`[${timeStr}] ERROR: UVC lamp intensity drops below 40% threshold!`);
          newLogs.push(`[${timeStr}] UV_DRIVER: Current reading = 0 mA (LAMP_FAILURE)`);
          newLogs.push(`[${timeStr}] SAFETY_TRIP: SOLENOID VALVE RELAY_1 = [DISABLED_CLOSED]`);
        }
      }

      setLogs(prev => [...prev, ...newLogs].slice(-40)); // Keep last 40 logs
    };

    generateLog();
    const t = setInterval(generateLog, 2500);
    return () => clearInterval(t);
  }, [data, status]);

  // Auto-scroll logs terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="diag-hud">
      {/* HUD Header */}
      <div className="diag-header">
        <div className="diag-title-wrap">
          <span className="diag-pulse" />
          <span className="diag-title">SYSTEM DIAGNOSTIC SHELL (v2.4.7-PRO)</span>
        </div>
        <div className="diag-meta-strip">
          <span>Uptime: {(performance.now() / 1000).toFixed(0)}s</span>
          <span>Baud: 115200 bps</span>
          <span>Core: ESP32-WROOM-32E</span>
        </div>
        <button onClick={onClose} className="diag-close-btn" title="Close Diagnostic Panel">
          ✕ CLOSE CONSOLE
        </button>
      </div>

      {/* Grid of Hardware Registers */}
      <div className="diag-grid">
        {/* Core MCU Stat */}
        <div className="diag-card">
          <div className="diag-card-lbl">MCU Temp & core VCC</div>
          <div className="diag-card-val">
            {(33.5 + (Math.random() - 0.5) * 0.8).toFixed(1)} °C
            <span className="diag-card-sub"> / 3.32V</span>
          </div>
        </div>

        {/* WiFi signal RSSI */}
        <div className="diag-card">
          <div className="diag-card-lbl">WiFi RSSI (Signal strength)</div>
          <div className="diag-card-val">
            {Math.round(-64 + (Math.random() - 0.5) * 4)} dBm
            <span className="diag-card-sub"> / Connected</span>
          </div>
        </div>

        {/* Solenoid state */}
        <div className="diag-card">
          <div className="diag-card-lbl">Inlet Solenoid Relay</div>
          <div className={`diag-card-val ${status === 'DANGER' ? 'val-err' : 'val-ok'}`}>
            {status === 'DANGER' ? 'OFF (CLOSED)' : 'ON (OPEN)'}
          </div>
        </div>

        {/* UV Ballast Volt */}
        <div className="diag-card">
          <div className="diag-card-lbl">UV Ballast Power Feed</div>
          <div className={`diag-card-val ${data.uvActive ? 'val-ok' : 'val-err'}`}>
            {data.uvActive ? '12.04 V' : '0.00 V'}
            <span className="diag-card-sub"> / {data.uvActive ? '420mA' : '0mA'}</span>
          </div>
        </div>

        {/* Flow Sensor Freq */}
        <div className="diag-card">
          <div className="diag-card-lbl">Flow Meter Frequency</div>
          <div className="diag-card-val">
            {(data.flowRate * 18.5).toFixed(1)} Hz
            <span className="diag-card-sub"> / Hall Effect</span>
          </div>
        </div>

        {/* RFID Handshake */}
        <div className="diag-card">
          <div className="diag-card-lbl">Filter Transponder UID</div>
          <div className="diag-card-val value-mono">
            {data.filterAuthentic ? 'RFID_AUTHENTIC_0x4B3A88F1' : 'TAG_FRAUD_ERR_BLOCKED'}
          </div>
        </div>
      </div>

      {/* Live Logging Terminal Console */}
      <div className="diag-console">
        <div className="diag-console-header">RAW HARDWARE SERIAL LOG STREAM:</div>
        <div className="diag-console-body">
          {logs.map((log, index) => {
            const isError = log.includes('ERROR') || log.includes('🚨') || log.includes('disabled');
            const isWarn = log.includes('WARNING') || log.includes('CAUTION') || log.includes('⚠');
            let cls = '';
            if (isError) cls = 'log-err';
            else if (isWarn) cls = 'log-warn';

            return (
              <div key={index} className={`console-line ${cls}`}>
                {log}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}
