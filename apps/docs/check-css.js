const fs = require("fs");
const css = fs.readFileSync("dist.css", "utf8");
const lines = css.split("\n");
const primary600 = lines.find((l) => l.includes("--color-primary-600"));
console.log("Compiled primary-600:", primary600);
