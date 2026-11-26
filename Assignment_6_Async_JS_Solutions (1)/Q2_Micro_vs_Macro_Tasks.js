// Q2 – Task Scheduler: Micro vs Macro Challenge

console.log("Start");

// setTimeout schedules a macrotask.
setTimeout(() => {
    console.log("setTimeout callback (macrotask)");
}, 0);

// Promise.then schedules a microtask.
Promise.resolve().then(() => {
    console.log("Promise callback (microtask)");
});

console.log("Synchronous log");
console.log("End");

// Expected output:
// Start
// Synchronous log
// End
// Promise callback (microtask)
// setTimeout callback (macrotask)
//
// Explanation:
// JavaScript first runs all synchronous statements in the current call stack.
// After the stack becomes empty, it processes the microtask queue (including
// Promise callbacks). Only after microtasks are completed does it process
// the macrotask queue, where the setTimeout callback is waiting.
