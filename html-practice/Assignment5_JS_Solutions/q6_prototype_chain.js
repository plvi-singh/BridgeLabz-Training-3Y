// Q6 - Prototype chain: Person -> Faculty -> Professor

function Person(name) {
  this.name = name;
}
Person.prototype.introduce = function () {
  console.log(`[Person]    I am ${this.name}`);
};

function Faculty(name, department) {
  Person.call(this, name);
  this.department = department;
}
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;
Faculty.prototype.showDepartment = function () {
  console.log(`[Faculty]   Department: ${this.department}`);
};

function Professor(name, department, researchArea) {
  Faculty.call(this, name, department); // also runs Person.call inside
  this.researchArea = researchArea;
}
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.showResearch = function () {
  console.log(`[Professor] Research area: ${this.researchArea}`);
};

const professor = new Professor("Dr. Mehta", "Physics", "Quantum Computing");

// One object can call methods from every level of the chain.
professor.showResearch();   // Professor.prototype
professor.showDepartment(); // Faculty.prototype
professor.introduce();      // Person.prototype

console.log("\n--- Chain walk ---");
let current = professor;
let level = 0;
while (current !== null) {
  console.log(`Level ${level}:`, current.constructor.name, "| own keys:", Object.getOwnPropertyNames(current));
  current = Object.getPrototypeOf(current);
  level++;
}
// Chain: professor -> Professor.prototype -> Faculty.prototype -> Person.prototype -> Object.prototype -> null
console.log("instanceof Professor/Faculty/Person:",
  professor instanceof Professor, professor instanceof Faculty, professor instanceof Person);
