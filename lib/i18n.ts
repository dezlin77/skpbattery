export type Locale = "en" | "zh-TW" | "ja" | "es" | "fr" | "de";

export const locales: Locale[] = ["en", "zh-TW", "ja", "es", "fr", "de"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export async function getTranslations(locale: Locale) {
  try {
    const t = await import(`../locales/${locale}.json`);
    return t.default;
  } catch {
    const t = await import(`../locales/en.json`);
    return t.default;
  }
}