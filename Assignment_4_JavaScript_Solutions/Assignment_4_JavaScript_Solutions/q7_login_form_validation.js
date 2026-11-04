// Q7: Login Form Validation using RegExp
// Link this file to q7_login_form.html.

const loginForm = document.getElementById("loginForm");

const usernamePattern = /^.{5,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errors = [];

    if (!usernamePattern.test(username)) {
        errors.push("Username must contain at least 5 characters.");
    }
    if (!passwordPattern.test(password)) {
        errors.push("Password must be at least 8 characters and include uppercase, lowercase, number and special character.");
    }

    const message = document.getElementById("loginMessage");
    message.style.color = errors.length ? "red" : "green";
    message.textContent = errors.length ? errors.join(" ") : "Login validation successful!";
});
