// Q9 – Fitness App Analytics
const workoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

class FitnessAnalytics {
    constructor(data) {
        this.data = data;
    }

    validateData() {
        if (!Array.isArray(this.data) || this.data.length === 0) {
            throw new Error("Workout dataset is empty or invalid.");
        }
    }

    // filter() selects users with more than 7000 steps.
    getActiveUsers() {
        this.validateData();
        return this.data.filter(person => person.steps > 7000);
    }

    // reduce() calculates total calories, then divides by user count.
    getAverageCalories() {
        this.validateData();

        const totalCalories = this.data.reduce(
            (sum, person) => sum + person.calories, 0
        );

        return totalCalories / this.data.length;
    }

    // map() converts each user's data into a readable message.
    getUserSummary() {
        this.validateData();

        return this.data.map(person =>
            person.user + " walked " + person.steps +
            " steps and burned " + person.calories + " calories."
        );
    }
}

try {
    const analytics = new FitnessAnalytics(workoutData);

    console.log("Active Users:");
    console.table(analytics.getActiveUsers());

    console.log("Average Calories:", analytics.getAverageCalories());

    console.log("User Summary:");
    analytics.getUserSummary().forEach(message => console.log(message));
} catch (error) {
    console.log("Analytics Error:", error.message);
}
