// Q2: Student Form Validator (Forms + RegExp)
// Link this file to q2_student_form.html using a script tag.

const form = document.getElementById("studentForm");
const fields = ["name", "email", "phone", "password"];

const patterns = {
    name: /^[A-Za-z ]+$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    phone: /^\d{10}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
};

function validateField(field) {
    const input = document.getElementById(field);
    const error = document.getElementById(`${field}Error`);
    const valid = patterns[field].test(input.value.trim());

    input.classList.toggle("valid", valid);
    input.classList.toggle("invalid", !valid);
    error.textContent = valid ? "" : getErrorMessage(field);
    return valid;
}

function getErrorMessage(field) {
    const messages = {
        name: "Enter alphabets only.",
        email: "Enter a valid email, e.g. example@domain.com.",
        phone: "Phone number must contain exactly 10 digits.",
        password: "Password needs at least one uppercase letter, one number and one special character."
    };
    return messages[field];
}

fields.forEach(field => {
    document.getElementById(field).addEventListener("input", () => validateField(field));
});

form.addEventListener("submit", event => {
    event.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);

    const result = document.getElementById("result");
    result.textContent = allValid ? "Registration successful!" : "Please correct the highlighted fields.";
    result.style.color = allValid ? "green" : "red";

    if (allValid) {
        console.log("Student details:", Object.fromEntries(
            fields.map(field => [field, document.getElementById(field).value.trim()])
        ));
    }
});
