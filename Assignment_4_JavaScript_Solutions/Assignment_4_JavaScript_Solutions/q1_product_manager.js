// Q1: E-Commerce Product Manager (Classes + Objects)

class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    applyDiscount(percent) {
        if (percent < 0 || percent > 100) {
            throw new Error("Discount must be between 0 and 100.");
        }
        this.price -= this.price * (percent / 100);
    }

    displayDetails() {
        return `ID: ${this.id} | Name: ${this.name} | Price: ₹${this.price.toFixed(2)} | Category: ${this.category}`;
    }
}

const products = [
    new Product(1, "Keyboard", 1500, "Electronics"),
    new Product(2, "Notebook", 80, "Stationery"),
    new Product(3, "Headphones", 2200, "Electronics"),
    new Product(4, "Water Bottle", 450, "Accessories")
];

// Apply a 10% discount to the first product as an example.
products[0].applyDiscount(10);

console.log("All products:");
products.forEach(product => console.log(product.displayDetails()));

console.log("\\nProducts with price greater than ₹1000:");
const expensiveProducts = products.filter(product => product.price > 1000);
expensiveProducts.forEach(product => console.log(product.displayDetails()));
