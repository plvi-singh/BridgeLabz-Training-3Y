// Q4 – Employee Inheritance and Runtime Polymorphism
class Employee {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    work() {
        console.log(this.name + " works in " + this.department + " department.");
    }
}

class Manager extends Employee {
    constructor(name, department) {
        super(name, department);
    }

    // Overrides the work() method of Employee.
    work() {
        console.log(this.name + " manages the " + this.department + " department.");
    }
}

const employee1 = new Employee("Riya", "IT");
const manager1 = new Manager("Aman", "HR");

// Same method name, different behavior depending on object type.
employee1.work();
manager1.work();

// This demonstrates runtime polymorphism through method overriding.
