"use strict";
// Q6 - Pyramid Pattern Generator
// Run with:  node q6_pyramid.js 6     (rows default to 5 if no/invalid input)

// Part 3: outer loop limit controlled by user input (default = 5)
const arg = parseInt(process.argv[2], 10);
const rows = Number.isInteger(arg) && arg > 0 ? arg : 5;

console.log(`---- Pyramid with let (rows=${rows}) ----`);
for (let i = 1; i <= rows; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "* ";
  }
  console.log(line.trimEnd());
}

// Part 1: replace let with var
console.log("\n---- Same pattern using var ----");
for (var a = 1; a <= rows; a++) {
  var line2 = "";
  for (var b = 1; b <= a; b++) {
    line2 += "* ";
  }
  console.log(line2.trimEnd());
}
// OBSERVATION: the printed pyramid is IDENTICAL. The difference is scope:
//  - let i / j  are block scoped, gone after the loop.
//  - var a / b / line2 are function/global scoped and survive the loop.
console.log("After var loops -> a:", a, "b:", b);
console.log("After let loops -> typeof i:", typeof i, "(not accessible)");

// Where var actually changes behaviour: closures capturing the loop variable
const withVar = [], withLet = [];
for (var v = 0; v < 3; v++) withVar.push(() => v);
for (let l = 0; l < 3; l++) withLet.push(() => l);
console.log("Closures with var:", withVar.map((f) => f()), "(all share one variable)");
console.log("Closures with let:", withLet.map((f) => f()), "(new binding per iteration)");

// Part 2: debug tips
// Breakpoint on `line += "* "`; watch i, j, line. With var, watch `a`/`b` in the Global/Script scope:
// the same variable is reused and mutated, with let a fresh `j` is created for each outer iteration.

// Part 4: strict mode catches an undeclared loop variable
try {
  new Function('"use strict"; for (k = 0; k < 3; k++) {}')();
} catch (e) {
  console.log(`Strict mode caught undeclared loop variable -> ${e.name}: ${e.message}`);
}
