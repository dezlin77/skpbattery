export type Locale = "en" | "zh-TW" | "ja" | "es" | "fr" | "de" | "ar";

export const locales: Locale[] = ["en", "zh-TW", "ja", "es", "fr", "de", "ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export async function getTranslations(locale: Locale) {
  try {
    const t = await import(`../locales/${locale}.json`);
    return t.default;
  } catch {
    const t = await import(`../locales/en.json`);
    return t.default;
  }
}