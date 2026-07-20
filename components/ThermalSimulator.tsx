"use client";
import { useRef, useState, useCallback } from "react";

interface SimResult {
  cellTemps: number[];
  maxTemp: number;
  avgTemp: number;
  hash: string;
  timestamp: string;
}

export default function ThermalSimulator({ t }: { t: Record<string, string> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellCount, setCellCount] = useState(20);
  const [cRate, setCRate] = useState(1.0);
  const [ambientTemp, setAmbientTemp] = useState(25);
  const [result, setResult] = useState<SimResult | null>(null);
  const [loading, setLoading] = useState(false);

  const drawHeatmap = useCallback((cellTemps: number[], minT: number, maxT: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = Math.ceil(Math.sqrt(cellTemps.length));
    const rows = Math.ceil(cellTemps.length / cols);
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cellTemps.forEach((temp, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const ratio = maxT === minT ? 0 : (temp - minT) / (maxT - minT);

      // Blue → Yellow → Red gradient
      let r, g, b;
      if (ratio < 0.5) {
        r = Math.round(30 + ratio * 2 * 200);
        g = Math.round(100 + ratio * 2 * 100);
        b = Math.round(255 - ratio * 2 * 255);
      } else {
        const t2 = (ratio - 0.5) * 2;
        r = Math.round(230 + t2 * 25);
        g = Math.round(200 - t2 * 200);
        b = Math.round(0);
      }

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(col * cellW + 1, row * cellH + 1, cellW - 2, cellH - 2);

      // Temperature label
      ctx.fillStyle = ratio > 0.6 ? "white" : "#0A0F1E";
      ctx.font = `bold ${Math.min(cellW, cellH) * 0.28}px Inter`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${temp.toFixed(0)}°`, col * cellW + cellW / 2, row * cellH + cellH / 2);
    });
  }, []);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/thermal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cellCount, cRate, ambientTemp }),
      });
      const data: SimResult = await res.json();
      setResult(data);
      const minT = Math.min(...data.cellTemps);
      drawHeatmap(data.cellTemps, minT, data.maxTemp);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const downloadReport = () => {
    if (!result) return;
    const content = `SKY POWER (US) — THERMAL SIMULATION REPORT
${"=".repeat(50)}

Date: ${new Date(result.timestamp).toLocaleString()}
Verification ID: SHA256-${result.hash}
Status: ${t.status}

CONFIGURATION
Cell Count:       ${cellCount}
Discharge Rate:   ${cRate}C
Ambient Temp:     ${ambientTemp}°C

RESULTS
Peak Temperature: ${result.maxTemp.toFixed(2)}°C
Avg Temperature:  ${result.avgTemp.toFixed(2)}°C

${"=".repeat(50)}
Sky Power (US) — Bring Heart To Power
www.skpbattery.com`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skypower-thermal-${result.hash.slice(0, 8)}.txt`;
    a.click();
  };

  return (
    <section id="simulator" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "var(--sky-red)", fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
        Free Tool
      </p>
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.75rem" }}>
        {t.title}
      </h2>
      <p style={{ color: "var(--sky-gray)", marginBottom: "3rem", maxWidth: "600px" }}>
        {t.sub}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem",
        alignItems: "start" }}>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { label: t.cell_count, value: cellCount, min: 4, max: 100, step: 1,
                onChange: (v: number) => setCellCount(v), unit: "" },
              { label: t.c_rate, value: cRate, min: 0.1, max: 5, step: 0.1,
                onChange: (v: number) => setCRate(v), unit: "C" },
              { label: t.ambient, value: ambientTemp, min: -20, max: 60, step: 1,
                onChange: (v: number) => setAmbientTemp(v), unit: "°C" },
              ].map(({ label, value, min, max, step, onChange, unit }) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between",
                marginBottom: "0.5rem" }}>
                <label style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                  fontWeight: 500 }}>{label}</label>
                <span style={{ color: "var(--sky-text)", fontWeight: 700, fontFamily: "monospace" }}>
                  {value}{unit}
                </span>
              </div>
              <input type="range" min={min} max={max} step={step}
                value={value}
                onChange={(e) => { onChange(Number(e.target.value)); }}
                style={{ width: "100%", accentColor: "var(--sky-red)", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between",
                color: "var(--sky-muted)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                <span>{min}{unit}</span><span>{max}{unit}</span>
              </div>
            </div>
          ))}

          <button onClick={runSimulation} disabled={loading}
            style={{ background: loading ? "var(--sky-red-dim)" : "var(--sky-red)",
              color: "white", border: "none", padding: "0.9rem 2rem",
              borderRadius: "8px", fontSize: "1rem", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s", marginTop: "0.5rem" }}>
            {loading ? t.running : t.run}
          </button>

          {/* Results */}
          {result && (
            <div style={{ background: "var(--sky-navy-light)", border: "1px solid var(--sky-border)",
              borderRadius: "10px", padding: "1.25rem",
              display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: t.max_temp, value: `${result.maxTemp.toFixed(1)}°C`,
                  color: result.maxTemp > 45 ? "#FF4444" : "#4ADE80" },
                { label: t.avg_temp, value: `${result.avgTemp.toFixed(1)}°C`,
                  color: "var(--sky-text)" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center" }}>
                  <span style={{ color: "var(--sky-gray)", fontSize: "0.85rem" }}>{label}</span>
                  <span style={{ color, fontWeight: 700, fontFamily: "monospace" }}>{value}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--sky-border)", paddingTop: "0.75rem" }}>
                <p style={{ color: "var(--sky-muted)", fontSize: "0.7rem", marginBottom: "0.25rem" }}>
                  {t.hash}
                </p>
                <p style={{ fontFamily: "monospace", fontSize: "0.65rem",
                  color: "var(--sky-blue)", wordBreak: "break-all" }}>
                  SHA256-{result.hash}
                </p>
                <p style={{ color: "var(--sky-muted)", fontSize: "0.65rem", marginTop: "0.25rem" }}>
                  {t.status}
                </p>
              </div>
              <button onClick={downloadReport}
                style={{ background: "transparent", border: "1px solid var(--sky-red)",
                  color: "var(--sky-red)", padding: "0.6rem 1rem", borderRadius: "6px",
                  cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, marginTop: "0.25rem" }}>
                ↓ {t.download}
              </button>
            </div>
          )}
        </div>

        {/* Canvas Heatmap */}
        <div style={{ position: "sticky", top: "80px" }}>
          <canvas ref={canvasRef} width={480} height={380}
            style={{ width: "100%", borderRadius: "12px",
              border: "1px solid var(--sky-border)",
              background: result ? "var(--sky-navy-light)" : "var(--sky-navy-light)",
              display: "block" }} />
          {!result && (
            <div style={{ position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", textAlign: "center",
              color: "var(--sky-muted)", pointerEvents: "none" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
              <p style={{ fontSize: "0.85rem" }}>Configure and run simulation</p>
            </div>
          )}

          {/* Gradient Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem",
            marginTop: "0.75rem" }}>
            <span style={{ color: "var(--sky-muted)", fontSize: "0.75rem" }}>Cool</span>
            <div style={{ flex: 1, height: "8px", borderRadius: "4px",
              background: "linear-gradient(to right, #1E64FF, #FFD700, #FF2000)" }} />
            <span style={{ color: "var(--sky-muted)", fontSize: "0.75rem" }}>Hot</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #simulator > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}