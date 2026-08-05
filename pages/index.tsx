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
      alert("Please fill in your name, email, and what you're building.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, company, email, building, message,
          voltage, energy, current, temp, quantity, unknownSpecs,
        }),
      });
      if (res.ok) alert("Message sent! A battery engineer will respond within 24 hours.");
      else alert("Failed to send. Please email ken@skpbattery.com directly.");
    } catch {
      alert("Failed to send. Please email ken@skpbattery.com directly.");
    }
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--sky-navy-light)",
    border: "1px solid var(--sky-border)",
    color: "var(--sky-text)",
    padding: "0.85rem 1rem",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    width: "100%",
  };

  const problems = [
    { q: t.problems?.q1 || "The enclosure is already designed.", a: t.problems?.a1 || "We engineer the pack around it." },
    { q: t.problems?.q2 || "We only need 50–500 units.", a: t.problems?.a2 || "That's exactly the kind of run we support." },
    { q: t.problems?.q3 || "The robot needs high peak current.", a: t.problems?.a3 || "We select the right cells and pack architecture." },
    { q: t.problems?.q4 || "It has to operate in extreme temperatures.", a: t.problems?.a4 || "We evaluate cell, pack and thermal behavior down to -40°C." },
    { q: t.problems?.q5 || "We're not battery engineers.", a: t.problems?.a5 || "Good. You don't need to become one." },
  ];

  const whyItems = [
    { icon: "📦", title: t.why?.moq_title || "Small MOQ", desc: t.why?.moq_desc || "From 50 packs for development builds. Scale to production without changing suppliers." },
    { icon: "⚡", title: t.why?.fast_title || "Fast Re-Design", desc: t.why?.fast_desc || "Design iterations in days. Our engineers turn feedback into updated specs fast." },
    { icon: "🌡️", title: t.why?.env_title || "Built for Difficult Environments", desc: t.why?.env_desc || "Extreme temperatures (-40°C to +85°C), vibration, high C-rate, constrained enclosures. Validated, not estimated." },
    { icon: "🔋", title: t.why?.crate_title || "High C-Rate", desc: t.why?.crate_desc || "Up to 5C continuous discharge. Engineered for robotics, UAVs, and high-draw devices." },
    { icon: "🔬", title: t.why?.thermal_title || "Thermal Expertise", desc: t.why?.thermal_desc || "In-house thermal simulation and validation. Every pack ships with a certified thermal profile." },
    { icon: "📋", title: t.why?.cert_title || "Certified", desc: t.why?.cert_desc || "UL, CE, UN38.3, IEC 62133 certified as standard. Full documentation for your compliance team." },
  ];

  const moqFeatures = t.moq_section?.features || [
    "Engineering support from day one",
    "Design iterations in days, not months",
    "Same team from prototype to production",
    "No minimum on engineering consultation",
  ];

  const caseStudies = t.case_studies?.items || [
    {
      title: "48V / 2.5kWh Industrial Pack",
      tags: ["48V", "2.5kWh", "-50°C to +50°C"],
      requirement: "48V · 2.5kWh · 35–55V operating range · custom cylindrical enclosure · extreme temperature",
      challenge: "Fit the entire battery inside a 22-inch usable cylindrical enclosure while meeting extreme temperature requirements.",
      solution: "Custom cell configuration + BMS + mechanical integration + full thermal analysis.",
      result: "Prototype → testing → pilot production. Delivered within spec.",
    },
    {
      title: "High C-Rate Drone Pack",
      tags: ["5C discharge", "Lightweight", "UAV"],
      requirement: "5C continuous discharge · lightweight · compact · 10–15 min flight endurance",
      challenge: "Maximize energy density while handling peak current without thermal runaway risk.",
      solution: "NMC cell selection + custom BMS with thermal cutoff + certified thermal simulation at peak load.",
      result: "Met flight endurance target. Passed UN38.3 transport certification.",
    },
    {
      title: "Medical Handheld Device",
      tags: ["IEC 62133", "SMBus", "Handheld"],
      requirement: "Handheld form factor · IEC 62133 · SMBus communication · 8-hour runtime",
      challenge: "Navigate certification while hitting an aggressive prototype timeline for clinical trials.",
      solution: "LFP chemistry for safety + full SBS 1.1 SMBus implementation + IEC 62133 certification.",
      result: "Prototype in 6 weeks. Certification achieved before clinical trial deadline.",
    },
  ];

  const howSteps = t.how_we_work?.steps || [
    { n: "01", title: "Tell Us What You're Building", desc: "Send voltage, energy, peak current, dimensions, temperature range, and quantity. Or just send your CAD drawing." },
    { n: "02", title: "Feasibility Review", desc: "We review cell selection, series/parallel configuration, mechanical fit, BMS, thermal requirements, charging, and connectors." },
    { n: "03", title: "Prototype Build", desc: "We build initial packs. Fast iterations — design changes measured in days, not weeks." },
    { n: "04", title: "Test & Refine", desc: "We test under real conditions and modify the design until it meets spec." },
    { n: "05", title: "Pilot Production", desc: "Start from 50 packs. UL, CE, UN38.3 and IEC 62133 certified as standard. ~10 week lead time." },
    { n: "06", title: "Scale Without Switching", desc: "Go from prototype to production without changing suppliers. Same team, same quality, same relationship." },
  ];

  return (
    <>
      <head>
        <title>Sky Power (US) — Custom Battery Packs for Robotics, Drones & Industrial Hardware</title>
        <meta name="description" content="Battery engineering partner for hardware startups and engineering firms. Custom lithium battery packs from 50 units. Small MOQ, fast design iterations, extreme climate (-40°C to +85°C), high C-rate. UL, CE, UN38.3, IEC 62133." />
        <meta name="keywords" content="custom battery pack robotics, small MOQ lithium battery, battery engineering partner, drone battery pack, AGV battery, medical device battery, extreme temperature battery, high C-rate battery" />
      </head>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>

        {/* ── HERO ── */}
        <section style={{
          minHeight: "90vh", display: "flex", alignItems: "center",
          padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto",
          gap: "4rem", flexWrap: "wrap",
        }}>
          <div style={{ flex: "1", minWidth: "300px" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "1rem" }}>
              {t.hero?.eyebrow}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)",
              marginBottom: "1.25rem", color: "var(--sky-text)", lineHeight: 1.12 }}>
              {t.hero?.headline}
            </h1>
            <p style={{ color: "var(--sky-gray)", fontSize: "1.1rem",
              maxWidth: "540px", marginBottom: "1rem", lineHeight: 1.75 }}>
              {t.hero?.sub}
            </p>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.88rem",
              marginBottom: "2rem" }}>
              Small MOQ · Custom Mechanical Design · BMS · Thermal Engineering · Extreme-Temperature Applications
            </p>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.88rem",
              fontStyle: "italic", marginBottom: "2.5rem" }}>
              {t.hero?.already_have}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="#contact"
                style={{ background: "var(--sky-red)", color: "white",
                  padding: "0.9rem 2rem", borderRadius: "8px",
                  fontWeight: 700, fontSize: "1rem" }}>
                {t.hero?.cta_sim} →
              </Link>
              <Link href="#simulator"
                style={{ background: "transparent", color: "var(--sky-text)",
                  padding: "0.9rem 2rem", borderRadius: "8px",
                  fontWeight: 600, fontSize: "1rem",
                  border: "1px solid #CBD5E1" }}>
                {t.hero?.cta_rfq}
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
                {t.hero?.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* ── YOUR BATTERY PROBLEM ── */}
        <section style={{
          borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)",
          background: "var(--sky-navy-light)",
          padding: "5rem 2rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "0.5rem" }}>
              {t.problems?.title}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              marginBottom: "3rem" }}>
              {t.problems?.sub}
            </h2>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "1.25rem" }}>
              {problems.map(({ q, a }) => (
                <div key={q}
                  style={{ padding: "1.5rem", border: "1px solid var(--sky-border)",
                    borderRadius: "12px", background: "white",
                    transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--sky-red)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(224,32,32,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--sky-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <p style={{ color: "var(--sky-muted)", fontSize: "0.85rem",
                    marginBottom: "0.6rem", fontStyle: "italic",
                    lineHeight: 1.5 }}>"{q}"</p>
                  <p style={{ color: "var(--sky-text)", fontWeight: 700,
                    fontSize: "0.95rem" }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SKP ── */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            Why Sky Power (US)
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            marginBottom: "3rem", maxWidth: "600px" }}>
            {t.why?.headline || "Built for Engineers Who Can't Afford to Wait"}
          </h2>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem" }}>
            {whyItems.map(({ icon, title, desc }) => (
              <div key={title}
                style={{ padding: "1.5rem", border: "1px solid var(--sky-border)",
                  borderRadius: "12px", background: "white",
                  transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--sky-red)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(224,32,32,0.07)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--sky-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{icon}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700,
                  marginBottom: "0.5rem", color: "var(--sky-text)" }}>{title}</h3>
                <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                  lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SMALL MOQ CALLOUT ── */}
        <section style={{ background: "var(--sky-red)", padding: "5rem 2rem", color: "white" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "4rem", alignItems: "center" }}
            className="moq-grid">
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                marginBottom: "1rem", color: "white" }}>
                {t.moq_section?.title}
              </h2>
              <p style={{ fontSize: "1.1rem", opacity: 0.9,
                lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {t.moq_section?.sub} {t.moq_section?.desc}
              </p>
              <p style={{ fontSize: "1.15rem", fontWeight: 800,
                marginBottom: "0.5rem" }}>
                {t.moq_section?.scale}
              </p>
              <p style={{ opacity: 0.85, fontSize: "0.9rem" }}>
                {t.moq_section?.scale_sub}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {moqFeatures.map((f: string) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "0.95rem", opacity: 0.95 }}>{f}</span>
                </div>
              ))}
              <Link href="#contact"
                style={{ marginTop: "1rem", background: "white",
                  color: "var(--sky-red)", padding: "0.9rem 1.5rem",
                  borderRadius: "8px", fontWeight: 700,
                  fontSize: "0.95rem", display: "inline-block",
                  textAlign: "center" }}>
                {t.contact?.send} →
              </Link>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .moq-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
        </section>

        {/* ── CASE STUDIES ── */}
        <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.case_studies?.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "0.75rem" }}>
            {t.case_studies?.sub}
          </h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "3rem", maxWidth: "500px" }}>
            Projects shown anonymously. Details available on request.
          </p>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem" }}>
            {caseStudies.map((cs: any) => (
              <div key={cs.title}
                style={{ border: "1px solid var(--sky-border)", borderRadius: "12px",
                  overflow: "hidden", background: "white", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ background: "var(--sky-navy-light)",
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid var(--sky-border)" }}>
                  <p style={{ color: "var(--sky-red)", fontSize: "0.7rem",
                    fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    {t.case_studies?.badge}
                  </p>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700,
                    color: "var(--sky-text)", marginBottom: "0.75rem" }}>
                    {cs.title}
                  </h3>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {cs.tags.map((tag: string) => (
                      <span key={tag}
                        style={{ background: "white", border: "1px solid var(--sky-border)",
                          color: "var(--sky-gray)", padding: "0.2rem 0.6rem",
                          borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "1.5rem", display: "flex",
                  flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: t.case_studies?.requirement, value: cs.requirement },
                    { label: t.case_studies?.challenge, value: cs.challenge },
                    { label: t.case_studies?.solution, value: cs.solution },
                    { label: t.case_studies?.result, value: cs.result },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700,
                        color: "var(--sky-red)", textTransform: "uppercase",
                        letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
                        {label}
                      </p>
                      <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                        lineHeight: 1.6 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section style={{ padding: "6rem 2rem",
          background: "var(--sky-navy-light)",
          borderTop: "1px solid var(--sky-border)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "0.5rem" }}>
              How We Work
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              marginBottom: "0.75rem" }}>
              {t.how_we_work?.title}
            </h2>
            <p style={{ color: "var(--sky-gray)", marginBottom: "3rem", maxWidth: "500px" }}>
              {t.how_we_work?.sub}
            </p>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem" }}>
              {howSteps.map((step: any) => (
                <div key={step.n || step.title}
                  style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flexShrink: 0, paddingTop: "2px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.72rem",
                      fontWeight: 800, color: "var(--sky-red)",
                      background: "rgba(224,32,32,0.08)",
                      padding: "0.3rem 0.55rem", borderRadius: "4px" }}>
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700,
                      marginBottom: "0.4rem", color: "var(--sky-text)" }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                      lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THERMAL SIMULATOR ── */}
        <ThermalSimulator t={t.simulator} />

        {/* ── CERTIFICATIONS ── */}
        <section style={{ padding: "4rem 2rem",
          borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)",
          background: "var(--sky-navy-light)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.8rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "1.5rem" }}>
              {t.certifications?.sub}
            </p>
            <div style={{ display: "flex", justifyContent: "center",
              gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {["UL", "CE", "UN38.3", "IEC 62133"].map((cert) => (
                <div key={cert}
                  style={{ background: "white", border: "1px solid var(--sky-border)",
                    borderRadius: "8px", padding: "0.75rem 1.5rem",
                    fontWeight: 800, fontSize: "1rem",
                    color: "var(--sky-text)", fontFamily: "monospace" }}>
                  {cert}
                </div>
              ))}
            </div>
            <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem" }}>
              Lead time: ~10 weeks · MOQ: from 50 packs · Full certification documentation included
            </p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "6rem 2rem",
          maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.contact?.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            marginBottom: "0.75rem" }}>
            {t.contact?.title}
          </h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            {t.contact?.sub}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { id: "c-name", type: "text", placeholder: t.contact?.name + " *" },
              { id: "c-company", type: "text", placeholder: t.contact?.company },
              { id: "c-email", type: "email", placeholder: t.contact?.email + " *" },
            ].map(({ id, type, placeholder }) => (
              <input key={id} id={id} type={type}
                placeholder={placeholder} style={inputStyle} />
            ))}

            <textarea id="c-building"
              placeholder={t.contact?.building + " *"} rows={3}
              style={{ ...inputStyle, resize: "vertical" }} />

            <label style={{ display: "flex", alignItems: "center",
              gap: "0.75rem", cursor: "pointer",
              color: "var(--sky-gray)", fontSize: "0.9rem" }}>
              <input type="checkbox"
                checked={unknownSpecs}
                onChange={(e) => setUnknownSpecs(e.target.checked)}
                style={{ accentColor: "var(--sky-red)", width: "16px", height: "16px" }} />
              {t.contact?.unknown}
            </label>

            {!unknownSpecs && (
              <>
                <p style={{ color: "var(--sky-muted)", fontSize: "0.8rem",
                  fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.05em", marginTop: "0.5rem" }}>
                  Battery Requirements
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { id: "c-voltage", placeholder: t.contact?.voltage },
                    { id: "c-energy", placeholder: t.contact?.energy },
                    { id: "c-current", placeholder: t.contact?.current },
                    { id: "c-temp", placeholder: t.contact?.temp },
                    { id: "c-quantity", placeholder: t.contact?.quantity },
                  ].map(({ id, placeholder }) => (
                    <input key={id} id={id} type="text"
                      placeholder={placeholder}
                      style={{ ...inputStyle, padding: "0.75rem 1rem", fontSize: "0.88rem" }} />
                  ))}
                </div>
              </>
            )}

            <textarea id="c-message"
              placeholder={t.contact?.message} rows={4}
              style={{ ...inputStyle, resize: "vertical" }} />

            <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem" }}>
              {t.contact?.email_direct}:{" "}
              <a href="mailto:ken@skpbattery.com"
                style={{ color: "var(--sky-red)", fontWeight: 600 }}>
                ken@skpbattery.com
              </a>
            </p>

            <button onClick={handleContact} disabled={sending}
              style={{ background: sending ? "#991414" : "var(--sky-red)",
                color: "white", border: "none", padding: "1rem",
                borderRadius: "8px", fontSize: "1rem",
                fontWeight: 700, cursor: sending ? "not-allowed" : "pointer",
                width: "100%", transition: "background 0.2s" }}>
              {sending ? "Sending..." : `${t.contact?.send} →`}
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--sky-border)",
          padding: "3rem 2rem", textAlign: "center",
          color: "var(--sky-muted)", fontSize: "0.8rem",
          background: "var(--sky-navy-light)" }}>
          <img src="/images/skypowerlogo1.png" alt="Sky Power"
            style={{ height: "32px", objectFit: "contain",
              display: "block", margin: "0 auto 1rem" }} />
          <p style={{ fontWeight: 500, color: "var(--sky-gray)",
            marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            {t.footer?.tagline}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            © {new Date().getFullYear()} Sky Power (US). {t.footer?.rights}
          </p>
          <p>
            <a href="mailto:ken@skpbattery.com"
              style={{ color: "var(--sky-red)", fontWeight: 600 }}>
              ken@skpbattery.com
            </a>
          </p>
        </footer>

      </main>
    </>
  );
}