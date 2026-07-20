"use client";
import { useState } from "react";
import Image from "next/image";
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
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--sky-border)",
      padding: "0 2rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <Link href="/">
        <img src="/images/skypowerlogo1.png" alt="Sky Power" width={140} height={36}
          style={{ objectFit: "contain" }} priority />
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        className="desktop-nav">
        {["home", "products", "simulator", "contact"].map((key) => (
          <Link key={key}
            href={key === "home" ? "/" : key === "simulator" ? "/simulator" : `/#${key}`}
            style={{ color: "var(--sky-gray)", fontSize: "0.9rem", fontWeight: 500,
              transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--sky-gray)")}>
            {t.nav[key]}
          </Link>
        ))}

        {/* Language Switcher */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setLangOpen(!langOpen)}
            style={{ background: "var(--sky-border)", border: "none", color: "var(--sky-text)",
              padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer",
              fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            🌐 {localeNames[currentLocale]}
          </button>
          {langOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "var(--sky-navy-light)", border: "1px solid var(--sky-border)",
              borderRadius: "8px", overflow: "hidden", minWidth: "160px", zIndex: 200 }}>
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

        {/* RFQ Button */}
        <Link href="/#contact"
          style={{ background: "var(--sky-red)", color: "white", padding: "0.5rem 1.2rem",
            borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600 }}>
          {t.contact.send}
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{ background: "none", border: "none", color: "white",
          fontSize: "1.5rem", cursor: "pointer", display: "none" }}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}