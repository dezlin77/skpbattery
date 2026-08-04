import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const locales = {
  "zh-TW": "Traditional Chinese (Taiwan)",
  "ja": "Japanese",
  "es": "Spanish",
  "fr": "French",
  "de": "German",
  "ar": "Arabic",
};

const enPath = path.join(process.cwd(), "locales/en.json");
const enContent = fs.readFileSync(enPath, "utf-8");

for (const [locale, language] of Object.entries(locales)) {
  console.log(`Translating to ${language}...`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [{
      role: "user",
      content: `Translate this JSON file from English to ${language}. 
Rules:
- Keep ALL JSON keys exactly the same (don't translate keys)
- Translate only the string VALUES
- Keep technical terms like "BMS", "CAN Bus", "SMBus", "UL", "CE", "UN38.3", "IEC 62133", "LFP", "NMC", "C-rate" in English
- Keep product names like "Sky Power (US)" in English
- Keep email addresses unchanged
- Keep URLs unchanged
- Keep numbers and symbols unchanged
- Return ONLY valid JSON, no explanation, no markdown code blocks

JSON to translate:
${enContent}`
    }],
  });

  const translated = response.content[0].text.trim();
  const outPath = path.join(process.cwd(), `locales/${locale}.json`);
  
  try {
    JSON.parse(translated); // validate
    fs.writeFileSync(outPath, translated, "utf-8");
    console.log(`✅ ${locale}.json updated`);
  } catch (e) {
    console.error(`❌ ${locale}.json failed - invalid JSON`);
    console.error(translated.slice(0, 200));
  }
}

console.log("\nDone! All locale files updated.");