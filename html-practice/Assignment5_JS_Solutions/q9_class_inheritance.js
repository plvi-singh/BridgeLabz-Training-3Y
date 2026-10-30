// Q9 - Person -> Student with ES6 classes, compared with the prototype version

// ---------- Prototype version (from Q5) ----------
function ProtoPerson(name) { this.name = name; }
ProtoPerson.prototype.printName = function () { return `Name: ${this.name}`; };

function ProtoStudent(name, branch) {
  ProtoPerson.call(this, name);
  this.branch = branch;
}
ProtoStudent.prototype = Object.create(ProtoPerson.prototype);
ProtoStudent.prototype.constructor = ProtoStudent;
ProtoStudent.prototype.printBranch = function () { return `Branch: ${this.branch}`; };

// ---------- ES6 class version ----------
class Person {
  constructor(name) {
    this.name = name;
  }
  printName() {
    return `Name: ${this.name}`;
  }
}

class Student extends Person {            // extends sets up the prototype chain for us
  constructor(name, branch) {
    super(name);                          // calls Person's constructor (required before using `this`)
    this.branch = branch;
  }
  printBranch() {
    return `Branch: ${this.branch}`;
  }
}

const protoStudent = new ProtoStudent("Kabir", "Computer Science");
const classStudent = new Student("Kabir", "Computer Science");

console.log("Prototype version:", protoStudent.printName(), "|", protoStudent.printBranch());
console.log("Class version    :", classStudent.printName(), "|", classStudent.printBranch());

console.log("\n--- Same behaviour check ---");
console.log("Same printName output  :", protoStudent.printName() === classStudent.printName());
console.log("Same printBranch output:", protoStudent.printBranch() === classStudent.printBranch());
console.log("Own keys (proto)       :", Object.keys(protoStudent));
console.log("Own keys (class)       :", Object.keys(classStudent));
console.log("Proto chain ok (proto) :", protoStudent instanceof ProtoPerson);
console.log("Proto chain ok (class) :", classStudent instanceof Person);
console.log("Methods live on prototype (proto):", !protoStudent.hasOwnProperty("printName"));
console.log("Methods live on prototype (class):", !classStudent.hasOwnProperty("printName"));

// A class is "syntactic sugar" over prototypes: typeof Student is still 'function'.
console.log("typeof Student:", typeof Student);
console.log("Object.getPrototypeOf(Student.prototype) === Person.prototype:",
  Object.getPrototypeOf(Student.prototype) === Person.prototype);

// Differences worth knowing: classes are not hoisted like functions (TDZ),
// class bodies run in strict mode, and a class can't be called without `new`.
try { Student("x", "y"); } catch (e) { console.log(`Calling class without new -> ${e.name}: ${e.message}`); }
