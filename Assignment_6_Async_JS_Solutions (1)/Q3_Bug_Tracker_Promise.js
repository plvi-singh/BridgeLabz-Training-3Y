// Q3 – Bug Tracker: Callback to Promise Migration

// Promise-based replacement for the original callback function.
function getBugs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldFail = Math.random() < 0.3; // 30% chance of API failure

            if (shouldFail) {
                reject(new Error("Bug API request failed."));
            } else {
                const bugs = [
                    "UI glitch",
                    "API timeout",
                    "Login failure"
                ];
                resolve(bugs);
            }
        }, 1000);
    });
}

// Handle the returned Promise.
getBugs()
    .then(bugs => {
        console.log("Bugs fetched successfully:");
        console.table(bugs.map((bug, index) => ({
            "Bug Number": index + 1,
            "Bug Description": bug
        })));
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
