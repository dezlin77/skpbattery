"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function Navbar({ t }: { t: any }) {
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
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--sky-border)",
        padding: "0 1.5rem", height: "64px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/">
          <img src="/images/skypowerlogo1.png" alt="Sky Power"
            style={{ height: "34px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
          className="desktop-nav">

          {[
            { label: "Solutions", href: "/#solutions" },
            { label: "For Startups", href: "/for-startups" },
            { label: "Engineering Firms", href: "/engineering-firms" },
            { label: "Simulator", href: "/#simulator" },
            { label: "Blog", href: "/blog" },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              style={{ color: "var(--sky-gray)", fontSize: "0.88rem",
                fontWeight: 500, whiteSpace: "nowrap",
                transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--sky-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--sky-gray)")}>
              {label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)}
              style={{ background: "var(--sky-border)", border: "none",
                color: "var(--sky-text)", padding: "0.35rem 0.75rem",
                borderRadius: "6px", cursor: "pointer",
                fontSize: "0.82rem", display: "flex",
                alignItems: "center", gap: "0.35rem" }}>
              🌐 {localeNames[currentLocale]}
            </button>
            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)",
                right: 0, background: "white",
                border: "1px solid var(--sky-border)",
                borderRadius: "8px", overflow: "hidden",
                minWidth: "160px", zIndex: 200,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                {locales.map((locale) => (
                  <button key={locale} onClick={() => switchLocale(locale)}
                    style={{ display: "block", width: "100%",
                      padding: "0.6rem 1rem",
                      background: locale === currentLocale
                        ? "var(--sky-navy-light)" : "transparent",
                      border: "none", color: "var(--sky-text)",
                      cursor: "pointer", textAlign: "left",
                      fontSize: "0.85rem",
                      fontWeight: locale === currentLocale ? 600 : 400 }}>
                    {localeNames[locale]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/#contact"
            style={{ background: "var(--sky-red)", color: "white",
              padding: "0.5rem 1.1rem", borderRadius: "6px",
              fontSize: "0.85rem", fontWeight: 700,
              whiteSpace: "nowrap" }}>
            Talk to an Engineer
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: "none", border: "none",
            color: "var(--sky-text)", fontSize: "1.5rem",
            cursor: "pointer", display: "none" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu"
          style={{ position: "fixed", top: "64px", left: 0, right: 0,
            zIndex: 99, background: "white",
            borderBottom: "1px solid var(--sky-border)",
            padding: "1.25rem 1.5rem",
            display: "none", flexDirection: "column", gap: "0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            maxHeight: "80vh", overflowY: "auto" }}>

          {[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/#solutions" },
            { label: "For Startups", href: "/for-startups" },
            { label: "Engineering Firms", href: "/engineering-firms" },
            { label: "Thermal Simulator", href: "/#simulator" },
            { label: "Blog", href: "/blog" },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              onClick={() => setMenuOpen(false)}
              style={{ color: "var(--sky-text)", fontSize: "1rem",
                fontWeight: 500, padding: "0.85rem 0",
                borderBottom: "1px solid var(--sky-border)",
                display: "block" }}>
              {label}
            </Link>
          ))}

          {/* Mobile Language Grid */}
          <div style={{ paddingTop: "1rem" }}>
            <p style={{ color: "var(--sky-muted)", fontSize: "0.75rem",
              fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Language
            </p>
            <div style={{ display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
              {locales.map((locale) => (
                <button key={locale} onClick={() => switchLocale(locale)}
                  style={{ padding: "0.5rem 0.25rem", borderRadius: "6px",
                    border: "1px solid var(--sky-border)",
                    background: locale === currentLocale
                      ? "var(--sky-red)" : "white",
                    color: locale === currentLocale ? "white" : "var(--sky-text)",
                    cursor: "pointer", fontSize: "0.78rem", fontWeight: 500 }}>
                  {localeNames[locale]}
                </button>
              ))}
            </div>
          </div>

          <Link href="/#contact"
            onClick={() => setMenuOpen(false)}
            style={{ background: "var(--sky-red)", color: "white",
              padding: "0.9rem", borderRadius: "8px",
              textAlign: "center", fontWeight: 700,
              marginTop: "1rem", display: "block" }}>
            Talk to an Engineer →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}