// Q8 – Order Processing Flow: Async Retry Mechanism

// This Promise succeeds or fails with equal probability.
function submitOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject(new Error("Order submission failed"));
            } else {
                resolve("Order submitted successfully");
            }
        }, 1000);
    });
}

async function processOrder() {
    // Try at most three times.
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const result = await submitOrder();
            console.log("Attempt " + attempt + ": Success");
            console.log(result);
            return; // Stop retrying after success.
        } catch (error) {
            console.log("Attempt " + attempt + ": Failed");
        }
    }

    // Reached only if all three attempts failed.
    throw new Error("Order could not be processed");
}

async function main() {
    try {
        await processOrder();
    } catch (error) {
        console.error(error.message);
    }
}

main();
