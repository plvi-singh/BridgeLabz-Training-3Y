// Q6: Employee Management System (Classes + Object Methods)

class Employee {
    constructor(id, name, department, salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary; // Monthly salary
    }

    getAnnualSalary() {
        return this.salary * 12;
    }

    applyBonus(percent) {
        if (percent < 0) {
            throw new Error("Bonus percentage cannot be negative.");
        }
        this.salary += this.salary * (percent / 100);
    }
}

const employees = [
    new Employee(1, "Aarav", "IT", 45000),
    new Employee(2, "Riya", "HR", 38000),
    new Employee(3, "Kabir", "Finance", 52000),
    new Employee(4, "Meera", "IT", 60000),
    new Employee(5, "Ishaan", "Sales", 40000)
];

console.log("Annual salary of each employee:");
employees.forEach(employee => {
    console.log(`${employee.name}: ₹${employee.getAnnualSalary().toFixed(2)}`);
});

// Example: give a 10% bonus to the first employee.
employees[0].applyBonus(10);

const totalAnnualPayout = employees.reduce(
    (total, employee) => total + employee.getAnnualSalary(),
    0
);

console.log(`\\nTotal annual company payout: ₹${totalAnnualPayout.toFixed(2)}`);
