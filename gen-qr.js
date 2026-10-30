// Generates assets/qr.svg for the repository link:  node gen-qr.js [url]
const QRCode = require("qrcode");
const fs = require("fs");
const url = process.argv[2] || "https://github.com/suryaaa-18/online-tutoring-system";
QRCode.toString(url, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#0b1f4d", light: "#ffffff" } })
  .then(svg => { fs.writeFileSync("assets/qr.svg", svg); console.log("QR written for", url); });
