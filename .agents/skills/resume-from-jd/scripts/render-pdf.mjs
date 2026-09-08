// Renders a self-contained resume HTML file to PDF using headless Chromium.
// Usage: node render-pdf.mjs <input.html> <output.pdf>
import puppeteer from "puppeteer";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node render-pdf.mjs <input.html> <output.pdf>");
  process.exit(1);
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
const fileUrl = pathToFileURL(path.resolve(inputPath)).href;
await page.goto(fileUrl, { waitUntil: "networkidle0" });
await page.pdf({
  path: path.resolve(outputPath),
  format: "Letter",
  printBackground: true,
  margin: { top: "0.4in", bottom: "0.4in", left: "0.4in", right: "0.4in" },
});
await browser.close();
console.log(`Wrote ${outputPath}`);
