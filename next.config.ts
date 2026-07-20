import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "zh-TW", "ja", "es", "fr", "de"],
    defaultLocale: "en",
  },
};

export default nextConfig;