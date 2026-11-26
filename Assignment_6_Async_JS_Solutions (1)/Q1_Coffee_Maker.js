// Q1 – The Startup Morning: Async Coffee Maker
// Each function returns a Promise and takes a random 1–2 seconds.

function delay() {
    return 1000 + Math.floor(Math.random() * 1001);
}

function boilWater() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject("Failed to boil water.");
            } else {
                console.log("Water boiled.");
                resolve();
            }
        }, delay());
    });
}

function brewCoffee() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject("Coffee brewing failed.");
            } else {
                console.log("Coffee brewed.");
                resolve();
            }
        }, delay());
    });
}

function pourCoffee() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject("Could not pour coffee.");
            } else {
                console.log("Coffee poured into the cup.");
                resolve();
            }
        }, delay());
    });
}

// Promise chaining ensures that each step starts after the previous one finishes.
boilWater()
    .then(() => brewCoffee())
    .then(() => pourCoffee())
    .then(() => console.log("Coffee ready for the team!"))
    .catch(error => console.error("Coffee process failed:", error));
