// Q5 – Ride-Sharing Application
class User {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}

class Driver extends User {
    constructor(name, rating, vehicle, vehicleNumber) {
        super(name, rating);
        this.vehicle = vehicle;
        this.vehicleNumber = vehicleNumber;
    }
}

class Trip {
    constructor(fromLocation, toLocation, distance) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
    }

    calculateFare() {
        if (this.distance === undefined || this.distance === null ||
            this.distance === "" || !Number.isFinite(Number(this.distance)) ||
            Number(this.distance) < 0) {
            throw new Error("Please provide a valid non-negative trip distance.");
        }

        const farePerKm = 12;
        return Number(this.distance) * farePerKm;
    }
}

const driver = new Driver("Rahul", 4.8, "Car", "UP16AB1234");
console.log("Driver:", driver.name);
console.log("Rating:", driver.rating);
console.log("Vehicle:", driver.vehicle);
console.log("Vehicle Number:", driver.vehicleNumber);

try {
    const trip = new Trip("Mathura", "Agra", 60);
    console.log("From:", trip.fromLocation);
    console.log("To:", trip.toLocation);
    console.log("Fare: Rs.", trip.calculateFare());
} catch (error) {
    console.log("Trip Error:", error.message);
}

// To test validation, use a negative or missing distance.
