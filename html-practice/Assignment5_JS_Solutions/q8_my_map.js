// Q8 - Custom Array.prototype.myMap()

// defineProperty keeps the method NON-enumerable, so it does not show up in for...in loops
// (a plain `Array.prototype.myMap = ...` would be enumerable and pollute loops).
Object.defineProperty(Array.prototype, "myMap", {
  value: function (callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }
    const result = [];
    for (let index = 0; index < this.length; index++) {
      if (index in this) { // skip holes in sparse arrays, like the built-in map
        result[index] = callback.call(thisArg, this[index], index, this); // value, index, array
      }
    }
    return result;
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

console.log([1, 2, 3].myMap((num) => num * 2));                 // [2, 4, 6]
console.log(["a", "b"].myMap((item, i) => `${i}:${item}`));      // [ '0:a', '1:b' ]
console.log([1, 2, 3].myMap((n) => n * 2), "<- myMap | map ->", [1, 2, 3].map((n) => n * 2));

// Same results as the built-in map?
const data = [5, 10, 15];
console.log("Same as map():", JSON.stringify(data.myMap((x) => x + 1)) === JSON.stringify(data.map((x) => x + 1)));
console.log("Original unchanged:", data);

// Error handling
try { [1].myMap("not a function"); } catch (e) { console.log(`${e.name}: ${e.message}`); }

// Proof that for...in is not polluted
const keys = [];
for (const key in [10, 20]) keys.push(key);
console.log("for...in keys:", keys); // ['0','1'] only
