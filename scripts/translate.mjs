import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import crypto from "crypto";

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

const hashPath = path.join(process.cwd(), "locales/.en-hash");
const currentHash = crypto.createHash("md5").update(enContent).digest("hex");

if (fs.existsSync(hashPath)) {
  const savedHash = fs.readFileSync(hashPath, "utf-8");
  if (savedHash === currentHash) {
    console.log("en.json unchanged — skipping translation.");
    process.exit(0);
  }
}

async function translate(language, content) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    messages: [{
      role: "user",
      content: `Translate this JSON file from English to ${language}.
Rules:
- Keep ALL JSON keys exactly the same (never translate keys)
- Translate only string VALUES
- Keep these terms in English: BMS, CAN Bus, SMBus, UL, CE, UN38.3, IEC 62133, LFP, NMC, C-rate, SHA-256, SMBus, SBS
- Keep "Sky Power (US)" in English
- Keep email addresses, URLs, numbers unchanged
- Return ONLY valid complete JSON, no explanation, no markdown code blocks, no truncation

JSON:
${content}`
    }],
  });
  return response.content[0].text.trim();
}

for (const [locale, language] of Object.entries(locales)) {
  console.log(`Translating to ${language}...`);
  
  let translated = await translate(language, enContent);
  
  // Remove markdown code blocks if present
  translated = translated.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  
  const outPath = path.join(process.cwd(), `locales/${locale}.json`);
  
  try {
    JSON.parse(translated);
    fs.writeFileSync(outPath, translated, "utf-8");
    console.log(`✅ ${locale}.json updated`);
  } catch (e) {
    console.error(`❌ ${locale}.json failed - invalid JSON`);
    // Save the raw output for debugging
    fs.writeFileSync(outPath + ".debug", translated, "utf-8");
    console.error(`   Debug saved to ${locale}.json.debug`);
    console.error(`   First 300 chars: ${translated.slice(0, 300)}`);
    console.error(`   Last 300 chars: ${translated.slice(-300)}`);
  }
}

fs.writeFileSync(hashPath, currentHash);
console.log("\nDone! All locale files updated.");