import Link from "next/link";
import { GetStaticProps } from "next";
import Navbar from "@/components/Navbar";
import { getTranslations, type Locale } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  return { props: { t } };
};

export default function EngineeringFirms({ t }: { t: any }) {
  return (
    <>
      <head>
        <title>For Engineering Firms — Sky Power (US) Battery Engineering Partner</title>
        <meta name="description" content="Battery engineering partner for boutique engineering firms, robotics design houses, and automation companies. You design the machine. We engineer the battery inside it." />
        <meta name="keywords" content="battery engineering partner, custom battery pack engineering firm, OEM battery pack, battery design service, robotics battery design, AGV battery engineering" />
      </head>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>

        {/* HERO */}
        <section style={{ padding: "6rem 2rem 4rem",
          maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "1rem" }}>
            For Engineering Firms
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            marginBottom: "1.25rem", color: "var(--sky-text)",
            lineHeight: 1.12 }}>
            Your Battery Engineering Partner
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--sky-red)",
            fontWeight: 600, marginBottom: "1.5rem" }}>
            You design the machine. We engineer the battery inside it.
          </p>
          <p style={{ color: "var(--sky-gray)", fontSize: "1.1rem",
            maxWidth: "640px", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Send us your enclosure, voltage, current, energy and environmental
            requirements. We'll work directly with your engineering team to develop
            the battery pack around your existing design — from feasibility through
            production.
          </p>
          <p style={{ color: "var(--sky-muted)", fontSize: "0.9rem",
            fontStyle: "italic", marginBottom: "2.5rem" }}>
            Already have a CAD drawing? Send it. We'll work from there.
          </p>
          <Link href="/#contact"
            style={{ background: "var(--sky-red)", color: "white",
              padding: "0.9rem 2rem", borderRadius: "8px",
              fontWeight: 700, fontSize: "1rem", display: "inline-block" }}>
            Start a Conversation →
          </Link>
        </section>

        {/* WHO WE WORK WITH */}
        <section style={{ padding: "4rem 2rem",
          background: "var(--sky-navy-light)",
          borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem" }}>Who We Work With</h2>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem" }}>
              {[
                { icon: "🏗️", name: "Mechanical Engineering Firms",
                  desc: "Your client needs a battery inside a machine you've designed. We develop it around your enclosure and specs." },
                { icon: "🤖", name: "Robotics Design Houses",
                  desc: "We're experienced with high C-rate packs, CAN Bus BMS, and demanding duty cycles for autonomous systems." },
                { icon: "🏭", name: "Automation Companies",
                  desc: "AGV, AMR, and industrial automation battery packs. High cycle life. Opportunity charging. Industrial enclosures." },
                { icon: "🎨", name: "Industrial Design Firms",
                  desc: "The battery is part of the product design. We work within your form factor constraints without compromising performance." },
                { icon: "🔬", name: "Product Development Consultancies",
                  desc: "We're a reliable battery engineering resource you can bring into client projects when battery expertise is needed." },
                { icon: "⚕️", name: "Medical Device Firms",
                  desc: "IEC 62133, UL certification, SMBus. We navigate the compliance requirements so your client doesn't have to." },
              ].map(({ icon, name, desc }) => (
                <div key={name}
                  style={{ border: "1px solid var(--sky-border)",
                    borderRadius: "12px", padding: "1.5rem",
                    background: "white",
                    transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--sky-red)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(224,32,32,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--sky-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.6rem" }}>{icon}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700,
                    marginBottom: "0.4rem", color: "var(--sky-text)" }}>{name}</h3>
                  <p style={{ color: "var(--sky-gray)", fontSize: "0.85rem",
                    lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE INTEGRATE */}
        <section style={{ padding: "5rem 2rem",
          maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            marginBottom: "0.75rem" }}>
            How We Integrate With Your Team
          </h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "3rem",
            fontSize: "1rem", maxWidth: "580px" }}>
            We work as a battery engineering extension of your team — not a
            vendor who takes specs and disappears. Direct engineer-to-engineer
            communication throughout the project.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { n: "01", title: "Send Your Constraints",
                desc: "Enclosure drawing or dimensions, voltage range, current requirements, temperature environment, and timeline. The more you send, the faster we can respond." },
              { n: "02", title: "Feasibility Assessment",
                desc: "We review your constraints and respond with a proposed battery architecture — cell chemistry, configuration, BMS approach, thermal strategy, and any mechanical concerns." },
              { n: "03", title: "Engineering Collaboration",
                desc: "Direct communication with our battery engineers. Iterate on the design. We adapt to your design review process." },
              { n: "04", title: "Prototype & Validation",
                desc: "We build prototypes to your spec. Thermal validation, load testing, BMS tuning. Full test reports available." },
              { n: "05", title: "Certification Support",
                desc: "UL, CE, UN38.3, IEC 62133 documentation. We handle certification so your client can focus on their product." },
              { n: "06", title: "Production",
                desc: "From prototype quantities to production runs. Same team throughout. Your client gets a consistent, reliable supplier." },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ display: "flex", gap: "1.5rem",
                paddingBottom: "2rem",
                borderBottom: "1px solid var(--sky-border)" }}>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.75rem",
                    fontWeight: 800, color: "var(--sky-red)",
                    background: "rgba(224,32,32,0.08)",
                    padding: "0.35rem 0.6rem", borderRadius: "4px" }}>
                    {n}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700,
                    marginBottom: "0.4rem", color: "var(--sky-text)" }}>
                    {title}
                  </h3>
                  <p style={{ color: "var(--sky-gray)", fontSize: "0.9rem",
                    lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY PARTNER */}
        <section style={{ background: "var(--sky-red)", padding: "5rem 2rem",
          color: "white" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "4rem", alignItems: "start" }}
            className="partner-grid">
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                marginBottom: "1rem", color: "white" }}>
                Why Engineering Firms Choose Us
              </h2>
              <p style={{ opacity: 0.9, lineHeight: 1.7, fontSize: "1rem" }}>
                One boutique engineering firm that trusts us becomes a recurring
                source of projects. We understand that relationship and treat
                it accordingly.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Direct engineer-to-engineer communication",
                "Custom battery engineering, not catalog selection",
                "Small MOQ — prototype quantities welcome",
                "Fast design iterations (days, not weeks)",
                "Full certification documentation included",
                "Same team from prototype to production",
                "Extreme temperature and high C-rate expertise",
                "NDA available for sensitive projects",
              ].map((f) => (
                <div key={f} style={{ display: "flex",
                  alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ width: "20px", height: "20px",
                    borderRadius: "50%", background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "0.7rem",
                    flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <span style={{ fontSize: "0.9rem", opacity: 0.95,
                    lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
              <Link href="/#contact"
                style={{ marginTop: "1rem", background: "white",
                  color: "var(--sky-red)", padding: "0.9rem 1.5rem",
                  borderRadius: "8px", fontWeight: 700,
                  fontSize: "0.95rem", display: "inline-block",
                  textAlign: "center" }}>
                Start a Conversation →
              </Link>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .partner-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--sky-border)",
          padding: "3rem 2rem", textAlign: "center",
          color: "var(--sky-muted)", fontSize: "0.8rem",
          background: "var(--sky-navy-light)" }}>
          <img src="/images/skypowerlogo1.png" alt="Sky Power"
            style={{ height: "32px", objectFit: "contain",
              display: "block", margin: "0 auto 1rem" }} />
          <p>© {new Date().getFullYear()} Sky Power (US). All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}