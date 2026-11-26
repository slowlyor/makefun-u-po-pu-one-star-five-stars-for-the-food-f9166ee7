// One Star, Five Stars for the Food — make.fun entry.
//
// Writes one sentence to /output/entry.txt: a one-star review of Earth
// from an alien tourist that still slips in a real compliment about the
// food. Deterministic, standard library only, no network, no model calls.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// One star for the planet, five stars for the food.
const SENTENCE =
  "One star: your gravity bruised all three of my knees, the locals queue for everything, and the air tastes of exhaust — but the tacos were so good I'd crash-land here again for one more.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and a single sentence. Refuse to write otherwise.
const trimmed = SENTENCE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  throw new Error(`entry is ${trimmed.length} characters, must be 1-200`);
}
const sentenceEnders = (trimmed.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !trimmed.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, SENTENCE, "utf8");
console.log(`wrote ${trimmed.length} characters to ${OUTPUT_PATH}`);
