// Q8: Dynamic Object Updater
// Link this file to q8_dynamic_object_updater.html.

const user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

const userForm = document.getElementById("userForm");
const output = document.getElementById("userDetails");

function displayUser() {
    output.textContent = JSON.stringify(user, null, 2);
}

userForm.addEventListener("submit", event => {
    event.preventDefault();

    // Update the same object with the values entered in the form.
    user.name = document.getElementById("name").value.trim();
    user.email = document.getElementById("email").value.trim();
    user.age = Number(document.getElementById("age").value);

    displayUser();
});

document.getElementById("name").value = user.name;
document.getElementById("email").value = user.email;
document.getElementById("age").value = user.age;
displayUser();
