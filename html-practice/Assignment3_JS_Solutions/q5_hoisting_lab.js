"use strict";
// Q5 - Hoisting Lab: The Sequence Trap

// ---------- Part 1: PREDICT ----------
// Original code, line by line (expected output: undefined / Game started / ready):
//   console.log(score);  -> undefined       (var score hoisted, initialised to undefined)
//   announce();          -> "Game started"  (function declaration hoisted WITH its body)
//   var score = 50;      -> assigns 50 now
//   let status = "ready";-> let is hoisted but in TDZ until this line executes
//   startGame();         -> "ready"         (called AFTER the let line, so TDZ is over)
//
// Memory state of each hoisted element at the start of execution:
//   score     (var)      : created, value undefined
//   announce  (function) : created, fully initialised (body available)
//   status    (let)      : created, UNINITIALISED (Temporal Dead Zone)
//   startGame (function) : created, fully initialised

console.log("---- Part 1: original code (runs OK) ----");
console.log(score);
announce();
var score = 50;
function announce() { console.log("Game started"); }
let status = "ready";
startGame();
function startGame() { console.log(status); }

// ---------- Part 1b: the real trap - let used before its line ----------
console.log("\n---- Part 1b: trap demo (TDZ) ----");
try {
  console.log(trapLet); // ReferenceError: Cannot access 'trapLet' before initialization
  let trapLet = "x";
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}

// ---------- Part 2: fixed, clean version ----------
console.log("\n---- Part 2: fixed version ----");
(function fixed() {
  let fixedScore = 50;            // declared before use: no undefined surprise
  let fixedStatus = "ready";
  function fixedAnnounce() { console.log("Game started"); }
  function fixedStart() { console.log(fixedStatus); }
  console.log(fixedScore);
  fixedAnnounce();
  fixedStart();
})();

// ---------- Part 3: arrow function version ----------
console.log("\n---- Part 3: arrow functions ----");
try {
  announceArrow(); // arrow assigned to const -> in TDZ, NOT callable yet
} catch (e) {
  console.log(`Arrow before definition -> ${e.name}: ${e.message}`);
}
const announceArrow = () => console.log("Game started (arrow)");
const startArrow = () => console.log(status);
announceArrow(); // works after the definition line
startArrow();
// DIFFERENCE: function declarations are hoisted with their body (callable anywhere in scope);
// arrow functions are values stored in let/const (TDZ) or var (undefined) -> only usable after definition.
// With `var announceVar = () => {}`, calling early gives TypeError: announceVar is not a function.
try {
  earlyVar();
  var earlyVar = () => {};
} catch (e) {
  console.log(`var arrow before definition -> ${e.name}: ${e.message}`);
}
