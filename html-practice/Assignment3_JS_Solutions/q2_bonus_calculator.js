"use strict";
// Q2 - Employee Bonus Calculator
// "use strict" means any accidental undeclared variable (e.g. `bonus = 5`) throws ReferenceError.
const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
];

function calculateBonus(emp) {
  if (!emp || !("salary" in emp) || !("years" in emp)) {
    throw new Error(`Missing property in employee record: ${JSON.stringify(emp)}`);
  }
  const salary = Number(emp.salary); // string -> number
  const years = Number(emp.years);
  if (Number.isNaN(salary) || Number.isNaN(years)) {
    throw new TypeError(`Cannot convert salary/years to number for ${emp.name}`);
  }
  const rate = years > 3 ? 0.1 : 0.05;
  const bonus = salary * rate; // `const` declared -> no implicit global
  return { salary, years, bonus, total: salary + bonus };
}

const inr = (n) => n.toLocaleString("en-IN");

for (const emp of employees) {
  try {
    const r = calculateBonus(emp);
    console.log(`Employee : ${emp.name}
  Salary : Rs ${inr(r.salary)}
  Years  : ${r.years}
  Bonus  : Rs ${inr(r.bonus)} (${r.years > 3 ? "10%" : "5%"})
  Total  : Rs ${inr(r.total)}
`);
  } catch (err) {
    console.log(`Error for ${emp.name}: ${err.message}`);
  }
}

// ---- Error handling demo: bad data ----
const badData = [
  { name: "Ravi", salary: "abc", years: "3" }, // conversion error
  { name: "Neha", salary: "40000" },           // missing property
];
console.log("---- Error handling demo ----");
for (const emp of badData) {
  try {
    calculateBonus(emp);
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
}

// ---- Strict mode demo: implicit global is blocked ----
try {
  undeclaredBonus = 100; // ReferenceError in strict mode
} catch (err) {
  console.log(`Strict mode caught: ${err.name}: ${err.message}`);
}
