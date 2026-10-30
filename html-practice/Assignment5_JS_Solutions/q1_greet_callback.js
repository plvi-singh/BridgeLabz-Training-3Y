// Q1 - greetUser with a callback

// The callback: runs AFTER the greeting is printed.
function showEndMessage() {
  console.log("Step 3: Welcome to the course!");
}

// greetUser receives a function (callback) as its second argument.
function greetUser(name, callback) {
  console.log("Step 1: greetUser started");
  console.log(`Step 2: Hello ${name}`);
  callback(); // control is handed to the callback here
  console.log("Step 4: greetUser finished (control returned after callback)");
}

console.log("--- Callback flow ---");
// Pass the function itself (no parentheses). Writing showEndMessage() would call it immediately.
greetUser("Riya", showEndMessage);

// Same idea with an inline (anonymous) callback
console.log("\n--- Anonymous callback ---");
greetUser("Arjun", () => console.log("Step 3: Welcome (from an inline arrow callback)!"));
