"use strict";
// Q10 - Nested Hoisting and Closures

console.log("---- Part 1: original ----");
function outer() {
  console.log(count);      // undefined: outer's own `var count` is hoisted
  var count = 5;
  function inner() {
    console.log(count);    // undefined: inner has its OWN hoisted `var count`, so it shadows outer's
    var count = 10;
  }
  inner();
}
outer();
// PREDICTED OUTPUT:  undefined  then  undefined   (NOT 5)

// Part 2: separate memory contexts. Each call creates its own execution context:
//   outer context: { count: undefined, inner: <function> } -> then count = 5
//   inner context: { count: undefined }                    -> then count = 10
// inner's `count` shadows outer's, so the closure never reaches outer's 5.
console.log("\n---- Part 2: how it behaves after removing the inner declaration ----");
function outer2() {
  var count = 5;
  function inner() {
    console.log("inner sees outer count:", count); // 5, closure over outer's variable
  }
  inner();
}
outer2();

// Part 3: inner as an arrow function
console.log("\n---- Part 3: inner as arrow ----");
function outerArrow() {
  console.log(count);      // undefined
  var count = 5;
  const inner = () => {
    console.log(count);    // still undefined: an arrow function still has its own function scope for `var`
    var count = 10;
  };
  inner();                 // must come AFTER the const line
  try {
    const early = () => later();
    early();
    const later = () => {};
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
  }
}
outerArrow();
// BEHAVIOUR CHANGES:
//  - var hoisting inside the arrow is the same (the arrow is a function, so it has its own var scope).
//  - the arrow itself is NOT hoisted like a declaration; `const inner` is in TDZ until its line runs,
//    so calling inner() before the definition throws ReferenceError.
//  - arrows have no own `this` / `arguments`; they use the surrounding ones.

// Part 4: debug session & call stack flow
// Set a breakpoint on `outer();` (bottom of Part 1) and press F11 (step into) repeatedly.
// CALL STACK grows:  (anonymous module) -> outer -> inner
//   then shrinks as each function returns:  inner pops first, then outer.
// In the VARIABLES panel: under `outer` Local scope, count = undefined before `var count = 5` runs;
// under `inner` Local scope, a SEPARATE count = undefined. Add `count` to WATCH and click frames
// in the CALL STACK to see different values for the same name.
