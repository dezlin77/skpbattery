
import Link from "next/link";
import { GetStaticProps } from "next";
import Navbar from "@/components/Navbar";
import ThermalSimulator from "@/components/ThermalSimulator";
import { getTranslations, type Locale } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await getTranslations((locale || "en") as Locale);
  return { props: { t } };
};

export default function Home({ t }: { t: Record<string, Record<string, string>> }) {
  return (
    <>
      <Navbar t={t} />
      <main style={{ paddingTop: "64px" }}>

        {/* HERO */}
        <section style={{ minHeight: "90vh", display: "flex", alignItems: "center",
  padding: "2rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto",
  gap: "4rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "300px" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "1rem" }}>
              {t.hero.eyebrow}
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginBottom: "1.5rem", color: "var(--sky-text)" }}>
              {t.hero.headline}
            </h1>
            <p style={{ color: "var(--sky-gray)", fontSize: "1.15rem",
              maxWidth: "520px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
              {t.hero.sub}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="#simulator"
                style={{ background: "var(--sky-red)", color: "white",
                  padding: "0.85rem 2rem", borderRadius: "8px",
                  fontWeight: 700, fontSize: "1rem" }}>
                {t.hero.cta_sim} →
              </Link>
              <Link href="#contact"
                style={{ background: "transparent", color: "var(--sky-text)",
                  padding: "0.85rem 2rem", borderRadius: "8px",
                  fontWeight: 600, fontSize: "1rem",
                  border: "1px solid #CBD5E1" }}>
                {t.hero.cta_rfq}
              </Link>
            </div>
          </div>

          <div style={{ flex: "1", minWidth: "300px", position: "relative" }}>
            <img src="/images/battery1.jpg" alt="Sky Power Battery Cells"
              width={600} height={400}
              style={{ width: "100%", height: "400px",
  objectFit: "cover", borderRadius: "16px",
  border: "1px solid var(--sky-border)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem",
              background: "rgba(10,15,30,0.85)", backdropFilter: "blur(8px)",
              border: "1px solid var(--sky-border)", borderRadius: "8px",
              padding: "0.75rem 1.25rem" }}>
              <p style={{ color: "var(--sky-red)", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
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
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem",
            textAlign: "center" }}>
            {[
              { value: "100+", label: t.stats.cells },
              { value: "5C", label: t.stats.crate },
              { value: "±0.5°C", label: t.stats.temp },
              { value: "SHA-256", label: t.stats.verified },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--sky-red)",
                  fontFamily: "Space Grotesk, sans-serif" }}>{value}</p>
                <p style={{ color: "var(--sky-gray)", fontSize: "0.8rem",
                  marginTop: "0.25rem" }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SIMULATOR */}
        <ThermalSimulator t={t.simulator} />

        {/* PRODUCTS */}
        <section id="products" style={{ padding: "6rem 2rem",
          background: "var(--sky-navy-light)",
          borderTop: "1px solid var(--sky-border)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ color: "var(--sky-red)", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontSize: "0.8rem", marginBottom: "0.5rem" }}>
              {t.products.title}
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              marginBottom: "3rem" }}>{t.products.sub}</h2>
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem" }}>
              {[
                { name: "SKP-18650-3000", chem: "LFP", cap: "3000mAh", volt: "3.2V", crate: "3C" },
                { name: "SKP-21700-4000", chem: "NMC", cap: "4000mAh", volt: "3.7V", crate: "5C" },
                { name: "SKP-26650-5000", chem: "LFP", cap: "5000mAh", volt: "3.2V", crate: "2C" },
              ].map((p) => (
                <div key={p.name}
                  style={{ background: "white", border: "1px solid var(--sky-border)",
                    borderRadius: "12px", padding: "1.5rem",
                    transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--sky-red)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--sky-border)")}>
                  <img src="/images/battery2.png" alt={p.name}
                    width={200} height={120}
                    style={{ width: "100%", height: "120px",
                      objectFit: "contain", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "monospace", fontSize: "1rem",
                    marginBottom: "1rem", color: "var(--sky-text)" }}>{p.name}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {[["Chemistry", p.chem], ["Capacity", p.cap],
                      ["Voltage", p.volt], ["Max Rate", p.crate]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex",
                        justifyContent: "space-between", fontSize: "0.82rem" }}>
                        <span style={{ color: "var(--sky-muted)" }}>{k}</span>
                        <span style={{ color: "var(--sky-text)", fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "1rem", display: "flex",
                    alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%",
                      background: "#4ADE80", display: "inline-block" }} />
                    <span style={{ color: "var(--sky-muted)", fontSize: "0.75rem" }}>
                      {t.products.verify}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "6rem 2rem",
          maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ color: "var(--sky-red)", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            {t.contact.title}
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            marginBottom: "0.75rem" }}>{t.contact.title}</h2>
          <p style={{ color: "var(--sky-gray)", marginBottom: "2.5rem" }}>
            {t.contact.sub}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { key: "name", type: "text", placeholder: t.contact.name },
              { key: "email", type: "email", placeholder: t.contact.email },
            ].map(({ key, type, placeholder }) => (
              <input key={key} type={type} placeholder={placeholder}
                style={{ background: "var(--sky-navy-light)",
                  border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                  padding: "0.85rem 1rem", borderRadius: "8px",
                  fontSize: "0.95rem", outline: "none", width: "100%" }} />
            ))}
            <textarea placeholder={t.contact.message} rows={5}
              style={{ background: "var(--sky-navy-light)",
                border: "1px solid var(--sky-border)", color: "var(--sky-text)",
                padding: "0.85rem 1rem", borderRadius: "8px",
                fontSize: "0.95rem", outline: "none",
                resize: "vertical", width: "100%" }} />
            <button style={{ background: "var(--sky-red)", color: "var(--sky-text)",
              border: "none", padding: "0.9rem", borderRadius: "8px",
              fontSize: "1rem", fontWeight: 700, cursor: "pointer",
              width: "100%" }}>
              {t.contact.send}
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--sky-border)",
          padding: "2rem", textAlign: "center",
          color: "var(--sky-muted)", fontSize: "0.8rem" }}>
          <img src="/images/skypowerlogo2.png" alt="Sky Power"
            width={32} height={32}
            style={{ objectFit: "contain", marginBottom: "0.75rem" }} />
          <p>© {new Date().getFullYear()} Sky Power (US). {t.footer.rights}</p>
        </footer>

      </main>
    </>
  );
}