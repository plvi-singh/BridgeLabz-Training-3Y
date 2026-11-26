// Q6 – E-Commerce Inventory System
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 5 },
    { id: 2, name: "Phone", category: "Electronics", price: 20000, stock: 2 },
    { id: 3, name: "T-Shirt", category: "Clothing", price: 800, stock: 20 },
    { id: 4, name: "Jeans", category: "Clothing", price: 1500, stock: 3 },
    { id: 5, name: "Book", category: "Stationery", price: 400, stock: 4 }
];

// 1. filter() returns products whose stock is below the threshold.
function getLowStockProducts(productList, threshold = 5) {
    return productList.filter(product => product.stock < threshold);
}

// 2. sort() sorts a copy by price in ascending order.
function sortProductsByPrice(productList) {
    return [...productList].sort((a, b) => a.price - b.price);
}

// 3. reduce() calculates price multiplied by stock for every product.
function calculateTotalInventoryValue(productList) {
    return productList.reduce(
        (total, product) => total + product.price * product.stock, 0
    );
}

// 4. reduce() groups products into an object using their category.
function groupByCategory(productList) {
    return productList.reduce((groups, product) => {
        if (!groups[product.category]) {
            groups[product.category] = [];
        }

        groups[product.category].push(product);
        return groups;
    }, {});
}

console.log("Low Stock Products:");
console.table(getLowStockProducts(products));

console.log("Products Sorted by Price:");
console.table(sortProductsByPrice(products));

console.log("Total Inventory Value: Rs.", calculateTotalInventoryValue(products));

console.log("Products Grouped by Category:");
console.log(groupByCategory(products));
