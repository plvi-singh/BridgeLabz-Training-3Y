"use strict";
// Q7 - Smart Calculator
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

class DivideByZeroError extends Error {
  constructor() { super("Cannot divide by zero"); this.name = "DivideByZeroError"; }
}
class NegativeRootError extends Error {
  constructor(n) { super(`Cannot take square root of negative number (${n})`); this.name = "NegativeRootError"; }
}
class InvalidOperationError extends Error {
  constructor(op) { super(`Unknown operation: '${op}'`); this.name = "InvalidOperationError"; }
}

function calculate(op, a, b) {
  switch (op) {
    case "add":      return a + b;
    case "subtract": return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError();
      return a / b;
    case "power":    return a ** b;
    case "root":     // square root of the first number
      if (a < 0) throw new NegativeRootError(a);
      return Math.sqrt(a);
    default:
      throw new InvalidOperationError(op);
  }
}

function runAll(list, a, b) {
  const results = [];
  for (const op of list) {
    try {
      results.push({ op, status: "OK", output: calculate(op, a, b) });
    } catch (err) {
      results.push({ op, status: "ERROR", output: `${err.name}: ${err.message}` });
    }
  }
  return results;
}

function printSummary(title, results) {
  console.log(`\n===== ${title} =====`);
  results.forEach((r) => console.log(`${r.op.padEnd(9)} | ${r.status.padEnd(5)} | ${r.output}`));
  const failed = results.filter((r) => r.status === "ERROR").length;
  console.log(`Total: ${results.length} | Success: ${results.length - failed} | Failed: ${failed}`);
}

printSummary(`Given input (${num1}, ${num2})`, runAll(operations, num1, num2));
printSummary("Extra: negative root + unknown op (-9, 3)", runAll(["root", "modulo", "power"], -9, 3));
