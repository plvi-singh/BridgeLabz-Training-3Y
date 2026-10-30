"use strict";
// Q9 - JSON Audit
const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
];

const requiredKeys = ["user", "age"];
const cleanData = [];
const errors = [];

for (let i = 0; i < rawData.length; i++) {
  const lineNo = i + 1;
  // DEBUG: breakpoint here. F10 over a bad line: JSON.parse throws -> control JUMPS straight to
  // `catch`, skipping the missing-key check and the push; the `for` loop then continues with i++.
  try {
    const obj = JSON.parse(rawData[i]);                        // may throw SyntaxError
    const missing = requiredKeys.filter((k) => !(k in obj));   // detect missing keys
    if (missing.length > 0) {
      throw new Error(`Missing key(s): ${missing.join(", ")}`);
    }
    cleanData.push(obj);
  } catch (err) {
    const kind = err instanceof SyntaxError ? "Invalid JSON" : "Missing keys";
    errors.push({ line: lineNo, kind, message: err.message });
    console.log(`Line ${lineNo} -> [${kind}] ${err.message}`);
  }
}

console.log("\nClean entries:", cleanData);
console.log(`Valid: ${cleanData.length} | Errors: ${errors.length}`);

// ---- Bonus: convert age to Number and filter under-18 ----
function adultsOnly(list) {
  return list.map((u) => ({ ...u, age: Number(u.age) })).filter((u) => u.age >= 18);
}
console.log("\nBonus - adults (age as Number):", adultsOnly(cleanData));

// Extra sample showing the filter actually removing someone
const sample = [...cleanData, { user: "Tim", age: "15" }];
console.log("Bonus - with extra minor in sample:", adultsOnly(sample));
