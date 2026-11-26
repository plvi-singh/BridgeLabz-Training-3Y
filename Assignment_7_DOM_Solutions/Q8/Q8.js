// Q8 – Custom Dropdown Using Only JavaScript
const dropdown = document.getElementById("dropdown");
const dropdownButton = document.getElementById("dropdownButton");
const options = document.getElementById("options");

dropdownButton.addEventListener("click", function () {
    options.hidden = !options.hidden;
});

options.addEventListener("click", function (event) {
    if (event.target.classList.contains("option")) {
        dropdownButton.textContent = event.target.textContent + " ▼";
        options.hidden = true;
    }
});

// Capturing phase: document sees the click before it reaches its target.
// If the click is outside the dropdown, close the options.
document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
        options.hidden = true;
    }
}, true);