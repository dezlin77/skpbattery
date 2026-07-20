import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import { getDb } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cellCount, cRate, ambientTemp } = req.body;

  // Lumped Capacitance Thermal Model
  const R_internal = 0.025;
  const C_thermal = 15;      // reduced for faster heat buildup
  const h_cooling = 1.5;     // less cooling to show more variation
  const I = cRate * 2.5;
  const dt = 1;
  const steps = 180;         // longer simulation

  const cellTemps: number[] = Array(cellCount).fill(ambientTemp);

  for (let t = 0; t < steps; t++) {
    for (let i = 0; i < cellCount; i++) {
      // Center cells heat more, edge cells cool better
      const center = cellCount / 2;
      const dist_from_center = Math.abs(i - center) / center;
      const position_factor = 1 + 0.8 * (1 - dist_from_center);
      const Q_gen = I * I * R_internal * position_factor;
      const Q_cool = h_cooling * (cellTemps[i] - ambientTemp) * (0.5 + dist_from_center);
      const dT = ((Q_gen - Q_cool) / C_thermal) * dt;
      cellTemps[i] = cellTemps[i] + dT;
    }
  }

  const maxTemp = Math.max(...cellTemps);
  const avgTemp = cellTemps.reduce((a, b) => a + b, 0) / cellTemps.length;

  const timestamp = new Date().toISOString();
  const payload = JSON.stringify({
    cellCount, cRate, ambientTemp,
    maxTemp: maxTemp.toFixed(2),
    avgTemp: avgTemp.toFixed(2),
    timestamp,
  });
  const hash = createHash("sha256").update(payload).digest("hex");

  // Save to Turso
  try {
    const db = getDb();
    await db.execute({
      sql: `INSERT INTO simulations 
            (created_at, cell_count, c_rate, ambient_temp, max_temp, avg_temp, hash) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [timestamp, cellCount, cRate, ambientTemp, maxTemp, avgTemp, hash],
    });
  } catch (err) {
    console.error("DB error:", err);
  }

  return res.status(200).json({ cellTemps, maxTemp, avgTemp, hash, timestamp });
}