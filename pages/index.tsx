import Link from "next/link";
import { GetStaticProps } from "next";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ThermalSimulator from "@/components/ThermalSimulator";
import { getTranslations, type Locale } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  return { props: { t } };
};

export default function Home({ t }: { t: any }) {
  const [unknownSpecs, setUnknownSpecs] = useState(false);
  const [sending, setSending] = useState(false);

  const handleContact = async () => {
    const getValue = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement)?.value || "";
    const name = getValue("c-name");
    const company = getValue("c-company");
    const email = getValue("c-email");
    const building = getValue("c-building");
    const message = getValue("c-message");
    const voltage = getValue("c-voltage");
    const energy = getValue("c-energy");
    const current = getValue("c-current");
    const temp = getValue("c-temp");
    const quantity = getValue("c-quantity");

    if (!name || !email || !building) {
      alert("Please fill in at least your name, email, and what you're building.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, company, email, building, message,
          voltage, energy, current, temp, quantity,
          unknownSpecs,
        }),
      });
      if (res.ok) alert("Message sent! A battery engineer will respond within 24 hours.");
      else alert("Failed to send. Please email ken@skpbattery.com directly.");
    } catch {
      alert("Failed to send. Please email ken@skpbattery.com directly.");
    }
    setSending(false);
  };

  return (
    <>
      <head>
        <title>Sky Power (US) — Custom Battery Packs for Robotics, Drones & Industrial Hardware</title>
        <meta name="description" content="Battery engineering partner for hardware startups and engineering firms. Custom lithium battery packs from 50 units. Small MOQ, fast iterations, extreme climate, high C-rate. UL, CE, UN38.3, IEC 62133 certified." />
        <meta name="keywords" content="custom battery pack robotics, small MOQ lithium battery, battery engineering partner, drone battery pack, AGV battery, medical device battery, extreme temperature battery, high C-rate battery pack" />
      </head>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>

        {/* HERO */}
        <section style={{ minHeight: "88vh", display: "flex", alignItems: "center",
          padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto",
          gap: "4rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "300px" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "1rem" }}>
              {t.hero.eyebrow}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)",
              marginBottom: "1.5rem", color: "var(--sky-text)", lineHeight: 1.15 }}>
              {t.hero.headline}
            </h1>
            <p style={{ color: "var(--sky-gray)", fontSize: "1.1rem",
              maxWidth: "520px", marginBottom: "1rem", lineHeight: 1.75 }}>
              {t.hero.sub}
            </p>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.9rem",
              marginBottom: "2.5rem", fontStyle: "italic" }}>
              {t.hero.already_have}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="#contact"
                style={{ background: "var(--sky-red)", color: "white",
                  padding: "0.9rem 2rem", borderRadius: "8px",
                  fontWeight: 700, fontSize: "1rem" }}>
                {t.hero.cta_sim} →
              </Link>
              <Link href="#simulator"
                style={{ background: "transparent", color: "var(--sky-text)",
                  padding: "0.9rem 2rem", borderRadius: "8px",
                  fontWeight: 600, fontSize: "1rem",
                  border: "1px solid #CBD5E1" }}>
                {t.hero.cta_rfq}
              </Link>
            </div>
          </div>

          <div style={{ flex: "1", minWidth: "300px", position: "relative" }}>
            <img src="/images/battery1.jpg" alt="Sky Power Custom Battery Packs"
              style={{ width: "100%", height: "420px",
                objectFit: "cover", borderRadius: "16px",
                border: "1px solid var(--sky-border)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem",
              background: "rgba(10,15,30,0.88)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
              padding: "0.85rem 1.25rem" }}>
              <p style={{ color: "var(--sky-red)", fontSize: "0.65rem",
                fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", marginBottom: "0.25rem" }}>
                Sky Power (US)
              </p>
              <p style={{ color: "white", fontWeight: 600, fontSize: "0.95rem" }}>
                {t.hero.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section style={{ borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)",
          background: "var(--sky-navy-light)", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem", textAlign: "center" }}>
            {[
              { value: "100+", label: t.stats.cells },
              { value: "5C", label: t.stats.crate },
              { value: "-40°C~+85°C", label: t.stats.temp },
              { value: "50 packs", label: t.stats.verified },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: "1.6rem", fontWeight: 800,
                  color: "var(--sky-red)", fontFamily: "Space Grotesk, sans-serif" }}>
                  {value}
                </p>
                <p style={{ color: "var(--sky-gray)", fontSize: "0.8rem",
                  marginTop: "0.25rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* YOUR BATTERY PROBLEM */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.problems.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            marginBottom: "3rem" }}>
            {t.problems.sub}
          </h2>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem" }}>
            {[
              { q: "The enclosure is already designed.", a: "We engineer the pack around it." },
              { q: "We only need 50–500 units.", a: "That's exactly the kind of run we support." },
              { q: "The robot needs high peak current.", a: "We select the right cells and pack architecture." },
              { q: "It has to operate in extreme temperatures.", a: "We evaluate cell, pack and thermal behavior." },
              { q: "We're not battery engineers.", a: "Good. You don't need to become one." },
            ].map(({ q, a }) => (
              <div key={q} style={{ padding: "1.5rem",
                border: "1px solid var(--sky-border)", borderRadius: "12px",
                background: "white" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--sky-red)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(224,32,32,0.07)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--sky-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                <p style={{ color: "var(--sky-muted)", fontSize: "0.85rem",
                  marginBottom: "0.5rem", fontStyle: "italic" }}>"{q}"</p>
                <p style={{ color: "var(--sky-text)", fontWeight: 700,
                  fontSize: "1rem" }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" style={{ padding: "6rem 2rem",
          background: "var(--sky-navy-light)",
          borderTop: "1px solid var(--sky-border)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "0.5rem" }}>
              {t.solutions.title}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              marginBottom: "0.75rem" }}>{t.solutions.sub}</h2>
            <p style={{ color: "var(--sky-gray)", marginBottom: "3rem",
              maxWidth: "500px" }}>
              Need a specific cell? We can engineer around it.
            </p>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem" }}>
              {[
                { name: "Robotics", spec: "48V · High current · Compact · Custom BMS", icon: "🤖" },
                { name: "AGV / AMR", spec: "24–72V · High cycle life · Industrial enclosure", icon: "🏭" },
                { name: "UAV / Drone", spec: "High energy density · High C-rate · Lightweight", icon: "🚁" },
                { name: "Medical Devices", spec: "IEC 62133 · SMBus · Handheld · Safe chemistry", icon: "🏥" },
                { name: "Electric Vehicles", spec: "Custom voltage · High capacity · CAN Bus BMS", icon: "🛵" },
                { name: "Extreme Temperature", spec: "-40°C to +85°C · Arctic to desert · Validated", icon: "🌡️" },
              ].map((s) => (
                <div key={s.name}
                  style={{ background: "white", border: "1px solid var(--sky-border)",
                    borderRadius: "12px", padding: "1.5rem",
                    transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--sky-red)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(224,32,32,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--sky-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700,
                    marginBottom: "0.4rem", color: "var(--sky-text)" }}>{s.name}</h3>
                  <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                    lineHeight: 1.5 }}>{s.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.how_we_work.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            marginBottom: "0.75rem" }}>{t.how_we_work.title}</h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "3rem",
            maxWidth: "500px" }}>{t.how_we_work.sub}</p>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem" }}>
            {[
              { n: "01", title: "Tell Us What You're Building",
                desc: "Send voltage, energy, peak current, dimensions, temperature range, and quantity. Or just send your CAD drawing." },
              { n: "02", title: "Feasibility Review",
                desc: "We review cell selection, series/parallel configuration, mechanical fit, BMS, thermal requirements, charging, and connectors." },
              { n: "03", title: "Prototype Build",
                desc: "We build initial packs. Fast iterations — design changes measured in days, not weeks." },
              { n: "04", title: "Test & Refine",
                desc: "We test under real conditions and modify the design until it meets spec." },
              { n: "05", title: "Pilot Production",
                desc: "Start from 50 packs. UL, CE, UN38.3 and IEC 62133 certified as standard." },
              { n: "06", title: "Scale Without Switching",
                desc: "Go from prototype to production without changing suppliers. Same team, same quality." },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem",
                    fontWeight: 800, color: "var(--sky-red)",
                    background: "rgba(224,32,32,0.08)", padding: "0.3rem 0.6rem",
                    borderRadius: "4px" }}>{n}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700,
                    marginBottom: "0.4rem", color: "var(--sky-text)" }}>{title}</h3>
                  <p style={{ color: "var(--sky-gray)", fontSize: "0.88rem",
                    lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THERMAL SIMULATOR */}
        <ThermalSimulator t={t.simulator} />

        {/* CERTIFICATIONS */}
        <section style={{ padding: "4rem 2rem",
          borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)",
          background: "var(--sky-navy-light)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.8rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Every Pack Ships Certified
            </p>
            <div style={{ display: "flex", justifyContent: "center",
              gap: "1.5rem", flexWrap: "wrap" }}>
              {["UL", "CE", "UN38.3", "IEC 62133"].map((cert) => (
                <div key={cert}
                  style={{ background: "white", border: "1px solid var(--sky-border)",
                    borderRadius: "8px", padding: "0.75rem 1.5rem",
                    fontWeight: 800, fontSize: "1rem", color: "var(--sky-text)",
                    fontFamily: "monospace" }}>
                  {cert}
                </div>
              ))}
            </div>
            <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
              marginTop: "1rem" }}>
              Lead time: ~10 weeks · MOQ: from 50 packs
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "6rem 2rem",
          maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.contact.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            marginBottom: "0.75rem" }}>{t.contact.title}</h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "2.5rem",
            lineHeight: 1.7 }}>{t.contact.sub}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Basic fields */}
            {[
              { id: "c-name", type: "text", placeholder: t.contact.name },
              { id: "c-company", type: "text", placeholder: t.contact.company },
              { id: "c-email", type: "email", placeholder: t.contact.email },
            ].map(({ id, type, placeholder }) => (
              <input key={id} id={id} type={type} placeholder={placeholder}
                style={{ background: "var(--sky-navy-light)",
                  border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                  padding: "0.85rem 1rem", borderRadius: "8px",
                  fontSize: "0.95rem", outline: "none", width: "100%" }} />
            ))}

            <textarea id="c-building" placeholder={t.contact.building} rows={3}
              style={{ background: "var(--sky-navy-light)",
                border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                padding: "0.85rem 1rem", borderRadius: "8px",
                fontSize: "0.95rem", outline: "none",
                resize: "vertical", width: "100%" }} />

            {/* Unknown specs checkbox */}
            <label style={{ display: "flex", alignItems: "center",
              gap: "0.75rem", cursor: "pointer", color: "var(--sky-gray)",
              fontSize: "0.9rem" }}>
              <input type="checkbox"
                checked={unknownSpecs}
                onChange={(e) => setUnknownSpecs(e.target.checked)}
                style={{ accentColor: "var(--sky-red)",
                  width: "16px", height: "16px" }} />
              {t.contact.unknown}
            </label>

            {/* Engineering fields — shown when specs are known */}
            {!unknownSpecs && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem" }}>
                {[
                  { id: "c-voltage", placeholder: t.contact.voltage },
                  { id: "c-energy", placeholder: t.contact.energy },
                  { id: "c-current", placeholder: t.contact.current },
                  { id: "c-temp", placeholder: t.contact.temp },
                  { id: "c-quantity", placeholder: t.contact.quantity },
                ].map(({ id, placeholder }) => (
                  <input key={id} id={id} type="text" placeholder={placeholder}
                    style={{ background: "var(--sky-navy-light)",
                      border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                      padding: "0.75rem 1rem", borderRadius: "8px",
                      fontSize: "0.88rem", outline: "none" }} />
                ))}
              </div>
            )}

            <textarea id="c-message" placeholder={t.contact.message} rows={4}
              style={{ background: "var(--sky-navy-light)",
                border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                padding: "0.85rem 1rem", borderRadius: "8px",
                fontSize: "0.95rem", outline: "none",
                resize: "vertical", width: "100%" }} />

            <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem" }}>
              {t.contact.email_direct}:{" "}
              <a href="mailto:ken@skpbattery.com"
                style={{ color: "var(--sky-red)", fontWeight: 600 }}>
                ken@skpbattery.com
              </a>
            </p>

            <button onClick={handleContact} disabled={sending}
              style={{ background: sending ? "#991414" : "var(--sky-red)",
                color: "white", border: "none", padding: "1rem",
                borderRadius: "8px", fontSize: "1rem", fontWeight: 700,
                cursor: sending ? "not-allowed" : "pointer", width: "100%" }}>
              {sending ? "Sending..." : t.contact.send}
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--sky-border)",
          padding: "3rem 2rem", textAlign: "center",
          color: "var(--sky-muted)", fontSize: "0.8rem",
          background: "var(--sky-navy-light)" }}>
          <img src="/images/skypowerlogo1.png" alt="Sky Power"
            style={{ height: "32px", objectFit: "contain",
              marginBottom: "1rem", display: "block", margin: "0 auto 1rem" }} />
          <p style={{ fontWeight: 500, color: "var(--sky-gray)",
            marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            {t.footer.tagline}
          </p>
          <p>© {new Date().getFullYear()} Sky Power (US). {t.footer.rights}</p>
        </footer>

      </main>
    </>
  );
}