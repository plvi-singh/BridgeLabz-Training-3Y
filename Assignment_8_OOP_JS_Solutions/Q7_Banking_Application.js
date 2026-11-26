// Q7 – Banking Application (Private Fields)
class BankAccount {
    #balance;

    constructor(initialBalance = 0) {
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }

        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive.");
        }

        this.#balance += amount;
        console.log("Deposited: Rs.", amount);
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }

        if (amount > this.#balance) {
            throw new Error("Insufficient balance.");
        }

        this.#balance -= amount;
        console.log("Withdrawn: Rs.", amount);
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(5000);

try {
    account.deposit(2000);
    console.log("Current Balance: Rs.", account.getBalance());

    account.withdraw(1000);
    console.log("Current Balance: Rs.", account.getBalance());

    // This withdrawal is invalid and will be handled by catch.
    account.withdraw(10000);
} catch (error) {
    console.log("Transaction Error:", error.message);
}

console.log("Final Balance: Rs.", account.getBalance());

// #balance is private and cannot be accessed directly outside the class.
