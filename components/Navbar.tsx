"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function Navbar({ t }: { t: Record<string, Record<string, string>> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const router = useRouter();
  const currentLocale = (router.locale || "en") as Locale;

  const switchLocale = (locale: Locale) => {
    router.push(router.pathname, router.asPath, { locale });
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--sky-border)",
        padding: "0 1.5rem", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/">
          <img src="/images/skypowerlogo1.png" alt="Sky Power"
            style={{ height: "36px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="desktop-nav">
          {["home", "products", "simulator", "blog", "contact"].map((key) => (
            <Link key={key}
              href={key === "home" ? "/" : key === "simulator" ? "/#simulator" : key === "blog" ? "/blog" : `/#${key}`}
              style={{ color: "var(--sky-gray)", fontSize: "0.9rem", fontWeight: 500 }}>
              {t.nav[key]}
            </Link>
          ))}

          {/* Language Switcher */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)}
              style={{ background: "var(--sky-border)", border: "none",
                color: "var(--sky-text)", padding: "0.4rem 0.8rem",
                borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem",
                display: "flex", alignItems: "center", gap: "0.4rem" }}>
              🌐 {localeNames[currentLocale]}
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0,
                background: "white", border: "1px solid var(--sky-border)",
                borderRadius: "8px", overflow: "hidden", minWidth: "160px",
                zIndex: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                {locales.map((locale) => (
                  <button key={locale} onClick={() => switchLocale(locale)}
                    style={{ display: "block", width: "100%", padding: "0.6rem 1rem",
                      background: locale === currentLocale ? "var(--sky-border)" : "transparent",
                      border: "none", color: "var(--sky-text)", cursor: "pointer",
                      textAlign: "left", fontSize: "0.85rem" }}>
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/#contact"
            style={{ background: "var(--sky-red)", color: "white",
              padding: "0.5rem 1.2rem", borderRadius: "6px",
              fontSize: "0.85rem", fontWeight: 600 }}>
            {t.contact.send}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: "none", border: "none", color: "var(--sky-text)",
            fontSize: "1.5rem", cursor: "pointer", display: "none" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
          background: "white", borderBottom: "1px solid var(--sky-border)",
          padding: "1rem 1.5rem", display: "none",
          flexDirection: "column", gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          {["home", "products", "simulator", "blog", "contact"].map((key) => (
            <Link key={key}
              href={key === "home" ? "/" : `/#${key}`}
              onClick={() => setMenuOpen(false)}
              style={{ color: "var(--sky-text)", fontSize: "1rem",
                fontWeight: 500, padding: "0.5rem 0",
                borderBottom: "1px solid var(--sky-border)" }}>
              {t.nav[key]}
            </Link>
          ))}

          {/* Mobile Language Switcher */}
          <div style={{ paddingTop: "0.5rem" }}>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.8rem",
              marginBottom: "0.5rem", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Language
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem" }}>
              {locales.map((locale) => (
                <button key={locale} onClick={() => switchLocale(locale)}
                  style={{ padding: "0.5rem", borderRadius: "6px",
                    border: "1px solid var(--sky-border)",
                    background: locale === currentLocale ? "var(--sky-red)" : "white",
                    color: locale === currentLocale ? "white" : "var(--sky-text)",
                    cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}>
                  {localeNames[locale]}
                </button>
              ))}
            </div>
          </div>

          <Link href="/#contact"
            onClick={() => setMenuOpen(false)}
            style={{ background: "var(--sky-red)", color: "white",
              padding: "0.75rem", borderRadius: "8px", textAlign: "center",
              fontWeight: 700, marginTop: "0.5rem" }}>
            {t.contact.send}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}