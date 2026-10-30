"use strict";
// Q3 - Transaction Validator
const transactions = [{ id: 1, amount: 2000 }, { id: 2, amount: -500 }, { id: 3 }, null];

// Custom error classes
class NegativeAmountError extends Error {
  constructor(id, amount) { super(`Transaction ${id} has negative amount (${amount})`); this.name = "NegativeAmountError"; }
}
class MissingFieldError extends Error {
  constructor(field, tx) { super(`Missing '${field}' in ${JSON.stringify(tx)}`); this.name = "MissingFieldError"; }
}
class NullTransactionError extends Error {
  constructor(index) { super(`Null entry at index ${index}`); this.name = "NullTransactionError"; }
}

function validate(tx, index) {
  if (tx === null) throw new NullTransactionError(index);
  if (tx.id === undefined) throw new MissingFieldError("id", tx);
  if (tx.amount === undefined) throw new MissingFieldError("amount", tx);
  if (tx.amount < 0) throw new NegativeAmountError(tx.id, tx.amount);
  return tx;
}

const valid = [];
const invalid = [];
const byType = { NegativeAmountError: [], MissingFieldError: [], NullTransactionError: [] };

for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];
  // DEBUG: set a breakpoint on the next line (click the gutter in VS Code, or keep the `debugger` statement).
  // Add `i`, `tx`, `valid`, `invalid` to the WATCH panel and press F10 (step over) / F11 (step into).
  // debugger;
  try {
    valid.push(validate(tx, i));
  } catch (err) {
    invalid.push({ index: i, type: err.name, message: err.message });
    (byType[err.name] || (byType[err.name] = [])).push(err.message); // categorise by error type
  }
}

console.log("========== TRANSACTION REPORT ==========");
console.log("Valid transactions  :", valid);
console.log("Invalid transactions:");
invalid.forEach((e) => console.log(`  [#${e.index}] ${e.type}: ${e.message}`));
console.log("\nErrors by category:");
for (const [type, list] of Object.entries(byType)) console.log(`  ${type}: ${list.length}`);
console.log(`\nSuccessful: ${valid.length} | Failed: ${invalid.length} | Total: ${transactions.length}`);
