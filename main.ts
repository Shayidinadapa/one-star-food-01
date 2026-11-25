import { mkdirSync, writeFileSync } from "node:fs";

// One sentence, one star for Earth, five stars for the food:
// an alien tourist complains about the planet, then admits the satay won.
const REVIEW =
  "One star: Earth billed me for breathing, towed my saucer, and rained without warning — but the satay was so good I'd come back, pay the fine, and eat it twice.";

const OUTPUT_PATH = "/output/entry.txt";

const text = REVIEW.trim();

// The gate accepts 1-200 characters of UTF-8 text, nothing else.
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text !== REVIEW) {
  throw new Error("entry changed after trimming; keep it one clean sentence");
}
// One sentence only: exactly one terminal period, no newlines inside.
if ((text.match(/\./g) ?? []).length !== 1 || text.includes("\n")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, text, "utf8");
console.log(`wrote ${text.length} characters to ${OUTPUT_PATH}`);
