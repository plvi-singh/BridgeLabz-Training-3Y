// Q5 – Frontend Rush: Avoiding Callback Hell

// A helper function that completes after one second.
function runStage(stageName, callback) {
    setTimeout(() => {
        console.log(stageName);
        callback();
    }, 1000);
}

// Version 1: Nested callbacks (callback hell).
function runWithCallbacks() {
    console.log("Starting callback pipeline...");

    runStage("Design completed", () => {
        runStage("Build completed", () => {
            runStage("Test completed", () => {
                runStage("Deploy completed", () => {
                    runStage("Celebrate! Pipeline finished.", () => {
                        console.log("Callback pipeline complete.");
                    });
                });
            });
        });
    });
}

// Promise-based helper used by the async/await version.
function runStageAsync(stageName) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(stageName);
            resolve();
        }, 1000);
    });
}

// Version 2: Cleaner sequential flow using async/await.
async function runWithAsyncAwait() {
    console.log("Starting async/await pipeline...");

    await runStageAsync("Design completed");
    await runStageAsync("Build completed");
    await runStageAsync("Test completed");
    await runStageAsync("Deploy completed");
    await runStageAsync("Celebrate! Pipeline finished.");

    console.log("Async/await pipeline complete.");
}

// Run one version at a time to keep their output separate.
// Uncomment the version you want to test.

runWithCallbacks();
// runWithAsyncAwait();

// Explanation:
// async/await makes asynchronous code look similar to ordinary sequential
// code. Each await pauses this async function until its Promise settles,
// without blocking the JavaScript main thread. This avoids deeply nested
// callbacks and makes the flow easier to read, debug, and maintain.
