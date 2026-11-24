// Loading Screen Gold: A Tip in 200 Characters
// One sharp, funny loading-screen tip for stressed developers and AI
// coding agents. The entry is a single line written to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const TIP =
  "The progress bar isn't stuck \u2014 it's just reading your code the way you read it: slowly, and with growing concern.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
function checkGate(tip: string): void {
  const chars = [...tip];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate: tip is ${chars.length} characters, must be 1-200`);
  }
  if (tip.trim().length === 0) {
    throw new Error("gate: tip must not be only white space");
  }
  if (tip.includes("\n")) {
    throw new Error("gate: tip must be a single line");
  }
}

checkGate(TIP);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, TIP + "\n", "utf8");

// Read back and verify what actually landed on disk.
const onDisk = readFileSync(`${outDir}/entry.txt`, "utf8").replace(/\n$/, "");
if (onDisk !== TIP) {
  throw new Error("verification: entry.txt content differs from TIP");
}
const fileHash = createHash("sha256").update(onDisk).digest("hex");
console.log(
  `wrote ${outDir}/entry.txt (${[...TIP].length} code points, sha256 ${fileHash}), verified: ${JSON.stringify(TIP)}`,
);
