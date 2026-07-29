import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, company, email, building, message,
    voltage, energy, current, temp, quantity, unknownSpecs } = req.body;

  const specsSection = unknownSpecs
    ? `<p><strong>Battery Specs:</strong> Unknown — customer needs guidance</p>`
    : `
      <p><strong>Voltage:</strong> ${voltage || "—"}</p>
      <p><strong>Energy/Capacity:</strong> ${energy || "—"}</p>
      <p><strong>Peak Current:</strong> ${current || "—"}</p>
      <p><strong>Operating Temperature:</strong> ${temp || "—"}</p>
      <p><strong>Quantity:</strong> ${quantity || "—"}</p>
    `;

  try {
    await resend.emails.send({
      from: "Sky Power Website <noreply@skpbattery.com>",
      to: "ken@skpbattery.com",
      subject: `New Engineering Inquiry from ${name} — ${company || "No company"}`,
      html: `
        <h2>New Battery Engineering Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p><strong>What they're building:</strong></p>
        <p>${building}</p>
        <hr/>
        <h3>Battery Requirements</h3>
        ${specsSection}
        <hr/>
        <p><strong>Additional Notes:</strong></p>
        <p>${message || "—"}</p>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send" });
  }
}