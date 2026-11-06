#!/usr/bin/env node
// For extracted plain text. It removes only exact repeated non-empty paragraphs.
// Usage: node scripts/dedupe-report-text.js report.txt [--write]
const fs = require('node:fs');
const path = require('node:path');

const [, , input, flag] = process.argv;
if (!input || !fs.existsSync(input)) {
  console.error('Usage: node scripts/dedupe-report-text.js <report.txt> [--write]');
  process.exit(1);
}
const absolute = path.resolve(input);
const content = fs.readFileSync(absolute, 'utf8');
const seen = new Set();
let removed = 0;
const output = content.split(/(\r?\n\s*\r?\n)/).filter((part) => {
  if (!part.trim()) return true;
  const key = part.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
  if (seen.has(key)) { removed += 1; return false; }
  seen.add(key);
  return true;
}).join('');

if (flag === '--write') {
  fs.writeFileSync(absolute, output, 'utf8');
  console.log(`Removed ${removed} exact duplicate paragraph(s) from ${absolute}`);
} else {
  console.log(`Found ${removed} exact duplicate paragraph(s). Preview follows:\n`);
  process.stdout.write(output);
  console.log('\nRun again with --write to replace the text file.');
}
