// Q3 – Product Discount System (Constructor + Prototype)
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// A prototype method is shared by all Product objects.
Product.prototype.applyDiscount = function(percent) {
    if (percent < 0 || percent > 100) {
        throw new Error("Invalid discount percentage");
    }

    return this.price - (this.price * percent / 100);
};

const product1 = new Product("Laptop", 50000);
const product2 = new Product("Mobile", 20000);
const product3 = new Product("Headphones", 5000);

console.log(product1.name, "Final Price:", product1.applyDiscount(10));
console.log(product2.name, "Final Price:", product2.applyDiscount(20));
console.log(product3.name, "Final Price:", product3.applyDiscount(15));

// Abstraction: the user calls applyDiscount() without handling the
// internal discount calculation.
