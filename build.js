const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { minify } = require("html-minifier-terser");
const JavaScriptObfuscator = require("javascript-obfuscator");
const CleanCSS = require("clean-css");

const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const srcDir = path.join(__dirname, "public");
const srcAssetsPath = path.join(srcDir, "assets");
const distAssetsPath = path.join(distDir, "assets");

if (fs.existsSync(srcAssetsPath)) {
  fse.copySync(srcAssetsPath, distAssetsPath, { overwrite: true, recursive: true });
  console.log("📁 Semua file dan folder assets disalin ke dist/assets/");
}

const htmlFiles = ["index.html"];

(async () => {
  for (const file of htmlFiles) {
    const filePath = path.join(srcDir, file);
    const htmlRaw = fs.readFileSync(filePath, "utf8");

    const cssMatch = htmlRaw.match(/<style>([\s\S]*?)<\/style>/);
    const cssRaw = cssMatch ? cssMatch[1] : "";
    const cssMin = new CleanCSS().minify(cssRaw).styles;

    const jsMatch = htmlRaw.match(/<script>([\s\S]*?)<\/script>/);
    const jsRaw = jsMatch ? jsMatch[1] : "";
    const jsObfuscated = JavaScriptObfuscator.obfuscate(jsRaw, {
      compact: true,
      controlFlowFlattening: true,
    }).getObfuscatedCode();

    let finalHtml = htmlRaw
      .replace(cssRaw, cssMin)
      .replace(jsRaw, jsObfuscated);

    const minified = await minify(finalHtml, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });

    const outPath = path.join(distDir, file);
    fs.writeFileSync(outPath, minified);
    console.log(`✅ Build selesai: ${file}`);
  }
})();