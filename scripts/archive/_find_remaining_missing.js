const fs = require('fs');
const content = fs.readFileSync('D:/WB/beauty-platform/js/i18n.js', 'utf8');

// Extract all keys from a language block
function extractKeys(langPattern) {
  const regex = new RegExp(langPattern + '\\s*:\\s*\\{');
  const match = content.match(regex);
  if (!match) return new Set();

  const startIdx = match.index + match[0].length;
  let braceCount = 1;
  let endIdx = startIdx;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIdx = i;
      break;
    }
  }

  const block = content.substring(startIdx, endIdx);
  const keys = new Set();
  const keyRegex = /['"]([\w.]+)['"]:/g;
  let keyMatch;
  while ((keyMatch = keyRegex.exec(block)) !== null) {
    keys.add(keyMatch[1]);
  }
  return keys;
}

const zhKeys = extractKeys('zh');
const zhHKKeys = extractKeys("['\"]zh-HK['\"]");

const missing = [...zhKeys].filter(k => !zhHKKeys.has(k));

console.log(`Missing ${missing.length} keys in zh-HK:`);
missing.forEach(k => console.log(`  ${k}`));
