// Q2 – Online Food Ordering (map + Error Handling)
const menu = [
    { name: "Pizza", price: 250 },
    { name: "Burger", price: 120 },
    { name: "Pasta", price: 180 },
    { name: "Sandwich", price: 100 }
];

function calculateBill(orderItems) {
    // map() finds each ordered item's price.
    const prices = orderItems.map(itemName => {
        const food = menu.find(item => item.name === itemName);

        if (!food) {
            throw new Error("Invalid item: " + itemName);
        }

        return food.price;
    });

    // reduce() adds all prices to calculate the bill.
    return prices.reduce((total, price) => total + price, 0);
}

try {
    const order = ["Pizza", "Burger", "Pasta"];
    console.log("Total Bill: Rs.", calculateBill(order));
} catch (error) {
    console.log("Error:", error.message);
}

// To test error handling, try: calculateBill(["Pizza", "Sushi"])
