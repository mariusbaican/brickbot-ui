import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 1. Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "../src");
const componentsDir = path.join(srcDir, "components");
const outputFile = path.join(srcDir, "index.ts"); // We generate a TS file so Babel can compile it later

console.log("⚙️  Generating index.ts...");

// 2. Read components directory
if (!fs.existsSync(componentsDir)) {
  console.error(`Error: ${componentsDir} does not exist.`);
  process.exit(1);
}

const items = fs.readdirSync(componentsDir);

// 3. Generate exports
// This assumes either:
// A) src/components/Button.tsx
// B) src/components/Button/index.tsx
const exports = items
  .filter((item) => {
    // Ignore non-component files if necessary (like .test.tsx or .stories.tsx)
    return !item.includes(".test.") && !item.includes(".stories.");
  })
  .map((item) => {
    const name = path.parse(item).name;
    return `export * from './components/${name}.js';`;
  })
  .join("\n");

// 4. Write to src/index.ts
fs.writeFileSync(outputFile, `// Auto-generated file\n${exports}\n`);

console.log("✅ src/index.ts generated successfully.");
