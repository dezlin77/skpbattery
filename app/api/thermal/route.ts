import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { cellCount, cRate, ambientTemp } = await req.json();

  // Lumped Capacitance Thermal Model
  const R_internal = 0.025; // ohms per cell
  const C_thermal = 50;     // J/°C thermal capacity
  const h_cooling = 2.5;    // W/°C cooling coefficient
  const I = cRate * 2.5;    // current in amps (2.5Ah cell)
  const dt = 1;             // time step seconds
  const steps = 120;        // 2 minute simulation

  const cellTemps: number[] = Array(cellCount).fill(ambientTemp);

  for (let t = 0; t < steps; t++) {
    for (let i = 0; i < cellCount; i++) {
      const position_factor = 1 + 0.15 * Math.sin((i / cellCount) * Math.PI);
      const Q_gen = I * I * R_internal * position_factor;
      const Q_cool = h_cooling * (cellTemps[i] - ambientTemp);
      const dT = ((Q_gen - Q_cool) / C_thermal) * dt;
      cellTemps[i] = cellTemps[i] + dT;
    }
  }

  const maxTemp = Math.max(...cellTemps);
  const avgTemp = cellTemps.reduce((a, b) => a + b, 0) / cellTemps.length;

  // SHA-256 verification hash
  const payload = JSON.stringify({
    cellCount,
    cRate,
    ambientTemp,
    maxTemp: maxTemp.toFixed(2),
    avgTemp: avgTemp.toFixed(2),
    timestamp: new Date().toISOString(),
  });
  const hash = createHash("sha256").update(payload).digest("hex");

  // Save to Turso
  try {
    const db = getDb();
    await db.execute({
      sql: `INSERT INTO simulations 
            (created_at, cell_count, c_rate, ambient_temp, max_temp, avg_temp, hash) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        new Date().toISOString(),
        cellCount,
        cRate,
        ambientTemp,
        maxTemp,
        avgTemp,
        hash,
      ],
    });
  } catch (err) {
    console.error("DB error:", err);
  }

  return NextResponse.json({
    cellTemps,
    maxTemp,
    avgTemp,
    hash,
    timestamp: new Date().toISOString(),
  });
}