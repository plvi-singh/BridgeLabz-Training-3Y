// Q9 – Debugging the Event Loop

// Predicted output:
// Script start
// Script end
// Promise callback
// Timeout callback

console.log("Script start");

setTimeout(() => {
    console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise callback");
});

console.log("Script end");

// Explanation:
// The two console.log statements in the main script are synchronous,
// so they execute first. The Promise.then callback is a microtask.
// The setTimeout callback is a macrotask. After the synchronous call
// stack is empty, JavaScript drains the microtask queue before starting
// the next macrotask. Therefore, the Promise callback appears before
// the timeout callback, even though the timeout delay is 0 milliseconds.
