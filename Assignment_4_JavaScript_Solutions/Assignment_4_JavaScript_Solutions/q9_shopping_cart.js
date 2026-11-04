// Q9: Shopping Cart Total (Classes + RegExp for Coupon)

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, quantity) {
        if (price < 0 || quantity <= 0) {
            throw new Error("Price must be non-negative and quantity must be positive.");
        }
        this.items.push({ name, price, quantity });
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }

    applyCoupon(code) {
        // Accepted examples: SAVE20 (20% off) and DISC10 (10% off).
        const couponPattern = /^(SAVE20|DISC10)$/;
        if (!couponPattern.test(code)) {
            return { valid: false, discountPercent: 0, finalTotal: this.getTotal() };
        }

        const discountPercent = code === "SAVE20" ? 20 : 10;
        const finalTotal = this.getTotal() * (1 - discountPercent / 100);
        return { valid: true, discountPercent, finalTotal };
    }
}

const cart = new Cart();
cart.addItem("Keyboard", 1200, 1);
cart.addItem("Mouse", 500, 2);
cart.addItem("USB Cable", 150, 3);

console.log("Cart items:", cart.items);
console.log(`Total before discount: ₹${cart.getTotal().toFixed(2)}`);

const couponCode = "SAVE20";
const result = cart.applyCoupon(couponCode);

if (result.valid) {
    console.log(`Coupon ${couponCode} applied: ${result.discountPercent}% discount`);
} else {
    console.log("Invalid coupon code. Use SAVE20 or DISC10.");
}
console.log(`Final total: ₹${result.finalTotal.toFixed(2)}`);
