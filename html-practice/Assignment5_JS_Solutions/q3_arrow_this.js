// Q3 - Arrow function vs normal function and `this`

const userWithArrow = {
  name: "Neha",
  // Arrow functions do NOT have their own `this`. They use the `this` of the place
  // where they were written (lexical this). That place is the top level of this file.
  showName: () => {
    console.log("Arrow  -> this.name =", this.name);
  },
};

userWithArrow.showName(); // undefined

// WHY undefined?
//  - An object literal ({ ... }) does NOT create a new scope, so `this` inside the arrow
//    is the `this` of the surrounding code.
//  - In a Node.js file that is module.exports, which is an empty object {}, so `.name` is undefined.
//  - In a browser's global code it would be `window` (window.name is usually "" ).
console.log("Top-level this in this file:", this, "(an empty object, so no 'name')");

// FIX: use a normal function (or method shorthand). `this` is decided by HOW it is called:
// user.showName() -> `this` is the object before the dot, i.e. `user`.
const user = {
  name: "Neha",
  showName: function () {
    console.log("Normal -> this.name =", this.name);
  },
  // Method shorthand is equivalent:
  showNameShort() {
    console.log("Short  -> this.name =", this.name);
  },
};

user.showName();      // Neha
user.showNameShort(); // Neha
