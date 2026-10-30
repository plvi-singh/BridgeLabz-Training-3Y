"use strict";
// Q4 - Debugging Mystery

// ---- Part 1: the original (broken) code ----
function showMessage() {
  greeting = "Welcome"; // undeclared
  console.log(greeting);
}
try {
  showMessage();
} catch (err) {
  // WHY: in sloppy mode, assigning to an undeclared name silently creates a global variable.
  // In strict mode that behaviour is removed: JS finds no binding for `greeting` in any scope
  // and throws a ReferenceError instead of creating a global.
  console.log(`Original code error -> ${err.name}: ${err.message}`);
}

// ---- Part 2: fixed version ----
function showMessageFixed() {
  const greeting = "Welcome"; // declared in function scope -> private, no global pollution
  console.log("Fixed:", greeting);
}
showMessageFixed();
// Scope rule change: before, a missing declaration meant "make a global".
// Now every variable must be declared with let/const (var in old code) and lives in its scope only.
console.log("Is `greeting` leaked globally?", typeof greeting === "undefined" ? "No" : "Yes");

// ---- Part 3: debugger steps (VS Code) ----
// 1. Click the gutter next to `const greeting` to set a breakpoint, press F5 (Run > Start Debugging).
// 2. In the WATCH panel click "+" and add: greeting
//    -> before the line runs it shows "not available"/undefined (TDZ); after F10 it shows "Welcome".
// 3. CALL STACK panel shows:  showMessageFixed  <- (anonymous) module wrapper  <- Node internals.
//    Click each frame to see its own variables (Local scope vs Global scope in the VARIABLES panel).
