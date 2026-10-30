// Q2 - applyOperation(numbers, operation)

// Higher-order function: takes an array and a callback, applies the callback to each element.
function applyOperation(numbers, operation) {
  const results = [];
  for (let index = 0; index < numbers.length; index++) {
    results.push(operation(numbers[index]));
  }
  return results;
}

const numbers = [1, 2, 3, 4];

const doubleNumber = (num) => num * 2;
const squareNumber = (num) => num * num;

console.log("Original  :", numbers);
console.log("Doubled   :", applyOperation(numbers, doubleNumber)); // [2, 4, 6, 8]
console.log("Squared   :", applyOperation(numbers, squareNumber)); // [1, 4, 9, 16]
console.log("Original unchanged:", numbers);
