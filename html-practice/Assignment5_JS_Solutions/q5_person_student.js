// Q5 - Person -> Student inheritance with constructor functions

function Person(name) {
  this.name = name;
}
Person.prototype.printName = function () {
  console.log(`Name: ${this.name}`);
};

function Student(name, branch) {
  Person.call(this, name); // borrow Person's constructor to set this.name
  this.branch = branch;
}

// Link the prototype chain: Student.prototype -> Person.prototype -> Object.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student; // restore the constructor reference

Student.prototype.printBranch = function () {
  console.log(`Branch: ${this.branch}`);
};
Student.prototype.printDetails = function () {
  this.printName();   // found up the chain on Person.prototype
  this.printBranch(); // found on Student.prototype
};

const student = new Student("Kabir", "Computer Science");
student.printDetails();

console.log("\n--- Prototype chain ---");
console.log("student instanceof Student :", student instanceof Student);
console.log("student instanceof Person  :", student instanceof Person);
console.log("student.__proto__ === Student.prototype          :", Object.getPrototypeOf(student) === Student.prototype);
console.log("Student.prototype.__proto__ === Person.prototype :", Object.getPrototypeOf(Student.prototype) === Person.prototype);
console.log("Own property 'name'?        :", student.hasOwnProperty("name"));
console.log("Own method 'printName'?     :", student.hasOwnProperty("printName"), "(found on Person.prototype)");
