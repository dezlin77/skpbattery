import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "zh-TW", "ja", "es", "fr", "de", "ar"],
    defaultLocale: "en",
  },
};

export default nextConfig;