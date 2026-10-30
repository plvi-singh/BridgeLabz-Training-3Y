"use strict";
// Q1 - Dynamic Data Parser
// Hoisting note: `apiData` is a const -> it lives in the Temporal Dead Zone until this line runs.
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// Step 1: show all three conversions for a value.
// Number(" ") is 0 and Number(null) is 0 (surprising!), so Number() alone can't be trusted for validation.
function convert(value) {
  return {
    asNumber: Number(value),   // "25"->25, "true"->NaN, null->0, undefined->NaN, " "->0
    asBoolean: Boolean(value), // ANY non-empty string is true (even "false" and " "); null/undefined -> false
    asString: String(value),   // null -> "null", undefined -> "undefined"
  };
}

// Step 2: a value is a valid number only if it is a non-blank string/number AND converts to a finite number.
function isValidNumber(value) {
  if (value === null || value === undefined) return false;      // Number(null)=0 would be a false positive
  if (typeof value === "string" && value.trim() === "") return false; // Number(" ")=0 would be a false positive
  return Number.isFinite(Number(value));                       // rejects NaN, "100px", "true", "false"
}

const validNumbers = [];
const invalidEntries = [];

console.log("========== DETAILED REPORT ==========");
for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];
  const { asNumber, asBoolean, asString } = convert(raw);
  const ok = isValidNumber(raw);

  // conditional formatting
  const tag = ok ? "[ VALID ]" : "[INVALID]";
  console.log(`${tag} #${i} raw=${JSON.stringify(raw)} | Number=${asNumber} | Boolean=${asBoolean} | String="${asString}"`);

  if (ok) validNumbers.push(asNumber);
  else invalidEntries.push({ index: i, raw: raw === undefined ? "undefined" : raw, reason: describe(raw) });
}

// Function declaration is hoisted, so it can be used above its definition.
function describe(v) {
  if (v === null) return "null value";
  if (v === undefined) return "undefined value";
  if (typeof v === "string" && v.trim() === "") return "blank string";
  if (Number.isNaN(Number(v))) return "not numeric";
  return "unknown";
}

console.log("\n---- Valid numeric data ----");
console.log(validNumbers);
console.log("Sum of valid numbers:", validNumbers.reduce((a, b) => a + b, 0));

console.log("\n---- Invalid data (logged separately) ----");
invalidEntries.forEach((e) => console.log(`Index ${e.index}: ${JSON.stringify(e.raw)} -> ${e.reason}`));
console.log(`\nSummary: ${validNumbers.length} valid, ${invalidEntries.length} invalid, ${apiData.length} total`);
