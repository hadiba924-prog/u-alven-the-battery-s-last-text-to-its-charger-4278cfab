// Entry for "The Battery's Last Text to Its Charger"
// Writes the battery's final text message to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Deterministic: same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The battery's last text to the charger that stood it up all day.
const ENTRY =
  "I waited all day by the outlet like a dog. You came home and charged your AirPods first. The power bank is taking me out tonight.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: one line, 1-200 characters, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
