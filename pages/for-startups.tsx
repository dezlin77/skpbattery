import Link from "next/link";
import { GetStaticProps } from "next";
import Navbar from "@/components/Navbar";
import { getTranslations, type Locale } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  return { props: { t } };
};

export default function ForStartups({ t }: { t: any }) {
  return (
    <>
      <head>
        <title>For Hardware Startups — Sky Power (US) Custom Battery Packs</title>
        <meta name="description" content="Battery engineering for hardware startups. From prototype to pilot production, starting from 50 packs. Cell selection, pack architecture, BMS, thermal design, certification preparation." />
        <meta name="keywords" content="battery pack for startups, small MOQ battery pack, prototype battery pack, hardware startup battery, custom lithium battery prototype" />
      </head>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>

        {/* HERO */}
        <section style={{ padding: "6rem 2rem 4rem",
          maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "1rem" }}>
            For Hardware Startups
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            marginBottom: "1.25rem", color: "var(--sky-text)",
            lineHeight: 1.12 }}>
            Building a New Product?
          </h1>
          <p style={{ fontSize: "1.3rem", color: "var(--sky-red)",
            fontWeight: 600, marginBottom: "1.5rem" }}>
            Don't wait until production to solve the battery.
          </p>
          <p style={{ color: "var(--sky-gray)", fontSize: "1.1rem",
            maxWidth: "620px", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            We work with hardware startups from prototype through pilot production,
            helping with everything from cell selection to certification. You focus
            on building the product. We engineer the battery inside it.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/#contact"
              style={{ background: "var(--sky-red)", color: "white",
                padding: "0.9rem 2rem", borderRadius: "8px",
                fontWeight: 700, fontSize: "1rem" }}>
              Tell Us What You're Building →
            </Link>
            <Link href="/#simulator"
              style={{ background: "transparent", color: "var(--sky-text)",
                padding: "0.9rem 2rem", borderRadius: "8px",
                fontWeight: 600, fontSize: "1rem",
                border: "1px solid #CBD5E1" }}>
              Free Thermal Simulation
            </Link>
          </div>
        </section>

        {/* WHAT WE HELP WITH */}
        <section style={{ padding: "4rem 2rem",
          background: "var(--sky-navy-light)",
          borderTop: "1px solid var(--sky-border)",
          borderBottom: "1px solid var(--sky-border)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem" }}>
              What We Help With
            </h2>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem" }}>
              {[
                { icon: "⚡", label: "Cell Selection" },
                { icon: "🏗️", label: "Pack Architecture" },
                { icon: "📦", label: "Mechanical Packaging" },
                { icon: "🖥️", label: "BMS Design" },
                { icon: "🔌", label: "Charging Systems" },
                { icon: "🔗", label: "Connectors" },
                { icon: "🌡️", label: "Thermal Design" },
                { icon: "🔨", label: "Prototype Builds" },
                { icon: "📋", label: "Certification Prep" },
                { icon: "🏭", label: "Low-Volume Production" },
              ].map(({ icon, label }) => (
                <div key={label}
                  style={{ background: "white",
                    border: "1px solid var(--sky-border)",
                    borderRadius: "10px", padding: "1.25rem",
                    display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem",
                    color: "var(--sky-text)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPICAL PROJECTS */}
        <section style={{ padding: "5rem 2rem",
          maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            marginBottom: "0.75rem" }}>Typical Projects</h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "2.5rem" }}>
            We've worked across many hardware categories. If your application
            isn't listed, contact us — we probably have relevant experience.
          </p>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem" }}>
            {[
              { icon: "🤖", name: "Robotics",
                desc: "High C-rate packs for motor-heavy platforms. CAN Bus BMS integration." },
              { icon: "🏭", name: "AGV / AMR",
                desc: "24–72V industrial packs. High cycle life. Opportunity charging." },
              { icon: "🚁", name: "Drones / UAV",
                desc: "Lightweight, high energy density. 5C+ discharge. UN38.3 certified." },
              { icon: "⚙️", name: "Industrial Equipment",
                desc: "Custom voltage and capacity. Rugged enclosures. Extreme temperature." },
              { icon: "🏥", name: "Medical Devices",
                desc: "IEC 62133 certified. SMBus. Handheld form factors. Safe chemistry." },
              { icon: "🎒", name: "Portable Equipment",
                desc: "Compact packs. Long runtime. Custom shapes. IP-rated enclosures." },
              { icon: "🛵", name: "Electric Vehicles",
                desc: "High capacity, custom BMS, CAN Bus. Light EV and mobility." },
              { icon: "🔧", name: "Specialized Tools",
                desc: "High-current bursts. Compact form. Custom connectors and PCB." },
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
        </section>

        {/* MOQ CALLOUT */}
        <section style={{ background: "var(--sky-red)", padding: "4rem 2rem",
          color: "white", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              marginBottom: "1rem", color: "white" }}>
              Typical Starting Point: 50 Packs
            </h2>
            <p style={{ fontSize: "1.05rem", opacity: 0.9,
              lineHeight: 1.7, marginBottom: "2rem" }}>
              You don't need a 10,000-unit commitment to get serious battery
              engineering. We designed our process around startups who need
              real packs, not catalog items.
            </p>
            <Link href="/#contact"
              style={{ background: "white", color: "var(--sky-red)",
                padding: "0.9rem 2rem", borderRadius: "8px",
                fontWeight: 700, fontSize: "1rem", display: "inline-block" }}>
              Tell Us What You're Building →
            </Link>
          </div>
        </section>

        {/* CHECKLIST */}
        <section style={{ padding: "5rem 2rem",
          maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            Battery Requirement Checklist
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            marginBottom: "0.75rem" }}>
            What Do We Need to Design Your Battery?
          </h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "3rem",
            fontSize: "1rem" }}>
            Don't have all of this? Send what you have. We'll help fill in the gaps.
          </p>
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem" }}>
            {[
              {
                category: "⚡ Electrical",
                items: ["Nominal voltage", "Operating voltage range",
                  "Capacity / energy (Wh)", "Continuous current",
                  "Peak current", "Charge rate"]
              },
              {
                category: "📐 Mechanical",
                items: ["Maximum dimensions", "Weight limit",
                  "Connector type", "Mounting method", "Enclosure material"]
              },
              {
                category: "🌍 Environment",
                items: ["Operating temperature", "Charging temperature",
                  "IP rating required", "Shock / vibration", "Humidity"]
              },
              {
                category: "🖥️ System",
                items: ["Charger type", "Communication protocol",
                  "BMS requirements", "SOC indicator", "Certifications needed"]
              },
            ].map(({ category, items }) => (
              <div key={category}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700,
                  color: "var(--sky-text)", marginBottom: "0.75rem" }}>
                  {category}
                </h3>
                <ul style={{ listStyle: "none", padding: 0,
                  display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex",
                      alignItems: "center", gap: "0.5rem",
                      color: "var(--sky-gray)", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--sky-red)",
                        fontSize: "0.7rem" }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", padding: "1.5rem",
            background: "var(--sky-navy-light)",
            border: "1px solid var(--sky-border)", borderRadius: "12px",
            textAlign: "center" }}>
            <p style={{ color: "var(--sky-gray)", marginBottom: "1rem" }}>
              Send what you have. Our engineers will help determine a
              feasible battery architecture for your project.
            </p>
            <Link href="/#contact"
              style={{ background: "var(--sky-red)", color: "white",
                padding: "0.75rem 1.5rem", borderRadius: "8px",
                fontWeight: 700, fontSize: "0.9rem",
                display: "inline-block" }}>
              Talk to a Battery Engineer →
            </Link>
          </div>
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