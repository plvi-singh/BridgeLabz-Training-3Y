// Q2 – Live Character Counter with Warning Behavior
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const resetButton = document.getElementById("resetButton");
const maximumCharacters = 100;

function updateCounter() {
    const remaining = maximumCharacters - message.value.length;
    counter.textContent = remaining + " characters remaining";

    counter.classList.remove("warning", "danger");

    if (remaining === 0) {
        counter.classList.add("danger");
    } else if (remaining <= 20) {
        counter.classList.add("warning");
    }
}

// keydown prevents typing more than 100 characters.
// maxlength also protects against ordinary typing/pasting.
message.addEventListener("keydown", function (event) {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight",
                         "ArrowUp", "ArrowDown", "Tab", "Home", "End"];

    const isShortcut = event.ctrlKey || event.metaKey;
    if (message.value.length >= maximumCharacters &&
        !allowedKeys.includes(event.key) && !isShortcut) {
        event.preventDefault();
    }
});

message.addEventListener("input", updateCounter);

resetButton.addEventListener("click", function () {
    message.value = "";
    updateCounter();
});

updateCounter();