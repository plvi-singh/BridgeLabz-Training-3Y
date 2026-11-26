// Q9 – Form Submit Blocker with preventDefault() and Live Errors
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const successMessage = document.getElementById("successMessage");

function validateName() {
    const error = document.getElementById("nameError");
    error.textContent = nameInput.value.trim() ? "" : "Name is required";
    return error.textContent === "";
}

function validateEmail() {
    const error = document.getElementById("emailError");
    error.textContent = emailInput.value.includes("@")
        ? "" : "Enter a valid email containing @";
    return error.textContent === "";
}

function validatePassword() {
    const error = document.getElementById("passwordError");
    error.textContent = passwordInput.value.length >= 6
        ? "" : "Password must contain at least 6 characters";
    return error.textContent === "";
}

// Validate fields as the user corrects their input.
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

form.addEventListener("submit", function (event) {
    // Prevent page reload/form submission until all fields are valid.
    event.preventDefault();

    const nameValid = validateName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (nameValid && emailValid && passwordValid) {
        successMessage.hidden = false;
        form.reset();
    } else {
        successMessage.hidden = true;
    }
});