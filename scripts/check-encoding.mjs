import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", ".next", ".git"]);
const extensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".prisma", ".css"]);
const mojibakeAlef = String.fromCharCode(0x0637, 0x00a7);
const replacementCharacter = String.fromCharCode(0xfffd);
const generatedMarker = `${String.fromCharCode(0x0646, 0x0635)} ${String.fromCharCode(0x0639, 0x0631, 0x0628, 0x064a)}`;
const mojibakeWord = String.fromCharCode(0x4d, 0x6f, 0x6a, 0x69, 0x62, 0x61, 0x6b, 0x65);
const badPatterns = [
  { name: "question-mark placeholder", regex: /\?{4,}/ },
  { name: "arabic mojibake marker", regex: new RegExp(mojibakeAlef) },
  { name: "replacement character", regex: new RegExp(replacementCharacter) },
  { name: "generated broken arabic marker", regex: new RegExp(`${generatedMarker}|${mojibakeWord}`) }
];

function hasWantedExtension(file) {
  return [...extensions].some((extension) => file.endsWith(extension));
}

async function walk(directory, files = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path, files);
    else if (hasWantedExtension(entry.name)) files.push(path);
  }
  return files;
}

const failures = [];
for (const file of await walk(root)) {
  const buffer = await readFile(file);
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    failures.push(`${file}: UTF-8 BOM`);
  }
  const text = buffer.toString("utf8");
  for (const pattern of badPatterns) {
    if (pattern.regex.test(text)) failures.push(`${file}: ${pattern.name}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Encoding check passed: UTF-8 without known broken Arabic markers.");
