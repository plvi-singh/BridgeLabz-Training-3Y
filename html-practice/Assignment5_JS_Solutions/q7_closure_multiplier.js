// Q7 - makeMultiplier and closures

function makeMultiplier(multiplier) {
  // The inner function "remembers" `multiplier` from its parent scope.
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(triple(5));  // 15
console.log(double(5));  // 10
console.log(triple(10)); // 30

// HOW THE CLOSURE WORKS
// 1. makeMultiplier(3) runs: a scope is created containing multiplier = 3.
// 2. It returns the inner function. Normally makeMultiplier's scope would be discarded after
//    returning, BUT the inner function still refers to `multiplier`, so JavaScript keeps that scope alive.
// 3. The inner function + its remembered outer scope = a closure.
// 4. `triple` and `double` each have their OWN private copy of `multiplier` (3 and 2),
//    so they never interfere with each other.
// 5. Calling triple(5) looks up `number` (own scope = 5) and `multiplier` (closure = 3) -> 15.
// `multiplier` can't be changed from outside: this is also how private data is made in JS.
console.log("Can we access multiplier from outside?", typeof multiplier); // undefined
