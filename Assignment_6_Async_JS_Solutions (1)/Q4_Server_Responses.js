// Q4 – DevOps Delay: Async Timeout Race

function contactServer(serverName, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Randomly fail a server request (20% chance).
            if (Math.random() < 0.2) {
                reject(new Error(serverName + " failed to respond."));
            } else {
                resolve(serverName + " responded successfully");
            }
        }, delay);
    });
}

// Create both Promises once so both operations run concurrently.
const serverA = contactServer("Server A", 2000);
const serverB = contactServer("Server B", 3000);

// Promise.all waits until both Promises succeed.
// It rejects if either Promise rejects.
Promise.all([serverA, serverB])
    .then(() => {
        console.log("Deployment completed for all servers");
    })
    .catch(error => {
        console.error("Deployment error:", error.message);
    });

// Promise.race settles as soon as the first Promise settles.
// In the successful case, Server A is expected to respond first.
Promise.race([serverA, serverB])
    .then(firstResponse => {
        console.log("Fastest response:", firstResponse);
    })
    .catch(error => {
        console.error("Race error:", error.message);
    });
