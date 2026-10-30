// Q4 - Car constructor and prototype method sharing

function Car(brand, model) {
  this.brand = brand; // own property: each object has its own copy
  this.model = model;
}

// Defined ONCE on Car.prototype and shared by every Car instance (saves memory).
Car.prototype.getDetails = function () {
  console.log(`Car: ${this.brand} ${this.model}`);
};

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Hyundai", "Creta");

car1.getDetails();
car2.getDetails();

console.log("\n--- Proof that the method is shared ---");
console.log("car1.getDetails === car2.getDetails :", car1.getDetails === car2.getDetails); // true
console.log("car1 has own 'getDetails'?          :", car1.hasOwnProperty("getDetails"));  // false
console.log("car1 has own 'brand'?               :", car1.hasOwnProperty("brand"));       // true
console.log("Object.getPrototypeOf(car1) === Car.prototype :", Object.getPrototypeOf(car1) === Car.prototype);
