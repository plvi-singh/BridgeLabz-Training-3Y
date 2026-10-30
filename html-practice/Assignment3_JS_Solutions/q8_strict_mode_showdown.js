"use strict";
// Q8 - Strict Mode Showdown
// Original code:
//   function demo(a, a) { total = 10; delete total; }
//   demo(5, 10);
// In strict mode this is a SyntaxError found at PARSE time (the whole file would not run),
// so we test both versions as strings with new Function() and catch the errors.

const sloppySrc = `
  function demo(a, a) { total = 10; var before = total; var removed = delete total; return { a: a, totalBeforeDelete: before, deleted: removed, stillExists: typeof total !== 'undefined' }; }
  return demo(5, 10);
`;
const strictSrc = '"use strict";\n' + sloppySrc;

console.log("---- WITHOUT strict mode ----");
try {
  console.log("Result:", new Function(sloppySrc)());
  // Duplicate params allowed: second `a` wins (a = 10).
  // `total = 10` silently creates a global; `delete total` removes that global property (returns true).
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}

console.log("\n---- WITH strict mode (whole function) ----");
try {
  console.log("Result:", new Function(strictSrc)());
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}

// Isolate each illegal operation to record every error separately
console.log("\n---- Each violation in strict mode ----");
const cases = {
  "duplicate parameter": '"use strict"; function f(a, a) {}',
  "undeclared assignment": '"use strict"; total = 10;',
  "delete of plain variable": '"use strict"; var x = 1; delete x;',
};
for (const [label, src] of Object.entries(cases)) {
  try { new Function(src)(); console.log(`${label}: no error`); }
  catch (e) { console.log(`${label}: ${e.name}: ${e.message}`); }
}

// WHY strict mode forbids them:
//  1. duplicate params: ambiguous, which `a` does the name refer to? Almost always a typo/bug.
//  2. undeclared assignment: typo (`totl = 10`) would silently create a global; leaks state, hard to debug.
//  3. delete variable: variables are not configurable properties; deleting them makes no sense and
//     can't be done reliably, so it is made an error (compile time for plain identifiers).

// ---- Correct ES6 version ----
function demo(a, b) {              // unique parameter names
  let total = a + b;               // declared; local scope
  const config = { total };
  delete config.total;             // delete is only meant for object PROPERTIES
  return { total, config };
}
console.log("\n---- Correct ES6 version ----");
console.log(demo(5, 10));

const demoArrow = (a, b) => ({ total: a + b });   // arrow functions never allow duplicate params, even in sloppy mode
console.log(demoArrow(5, 10));
