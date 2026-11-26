// Q10 – The Final Delivery: Async Pipeline Debugger

// Returns a Promise that takes 1–2 seconds and may randomly fail.
function deliveryStep(stepName, successMessage) {
    return new Promise((resolve, reject) => {
        const delay = 1000 + Math.floor(Math.random() * 1001);

        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error(stepName + " failed"));
            } else {
                console.log(successMessage);
                resolve();
            }
        }, delay);
    });
}

async function runPipeline() {
    console.log("Start Pipeline");

    try {
        // await makes these steps run in sequence.
        await deliveryStep("takeOrder", "Step 1: Order taken");
        await deliveryStep("prepare", "Step 2: Food prepared");
        await deliveryStep("pack", "Step 3: Package ready");
        await deliveryStep("dispatch", "Step 4: Out for delivery");
        await deliveryStep("deliver", "Delivery completed!");

    } catch (error) {
        // If any step rejects, control jumps directly to this catch block.
        console.error("Pipeline failed!", error.message);
    }
}

// Start the asynchronous pipeline.
runPipeline();

// Async behavior and event loop:
// Calling runPipeline() starts the async function. Each deliveryStep()
// returns a Promise. When execution reaches await, runPipeline pauses
// until that Promise settles; it does not block the JavaScript main thread.
// Timers become eligible to run after their delay. Promise continuations
// are scheduled as microtasks and run after the current synchronous stack
// is empty. If a step rejects, await throws the rejection reason and
// the catch block handles it.
