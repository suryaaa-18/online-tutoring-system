// Renders poster.html → poster.pdf (A2, 594×420 mm) and poster.png:  node render.js
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 2339, height: 1654 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.resolve(__dirname, "poster.html"));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "poster.png" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: "poster.pdf", preferCSSPageSize: true, printBackground: true, pageRanges: "1" });
  await browser.close();
  console.log("rendered poster.png and poster.pdf");
})();
