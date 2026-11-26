// Q1 – Dynamic Product List Manager (Event Delegation)
const productInput = document.getElementById("productInput");
const addButton = document.getElementById("addButton");
const productList = document.getElementById("productList");

addButton.addEventListener("click", function () {
    const productName = productInput.value.trim();

    if (!productName) {
        alert("Please enter a product name");
        return;
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "productName";
    span.textContent = productName;

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    li.append(span, editButton, deleteButton);
    productList.appendChild(li);
    productInput.value = "";
});

// One parent listener handles clicks on all current and future list buttons.
productList.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) return;

    if (event.target.classList.contains("delete")) {
        li.remove();
    }

    if (event.target.classList.contains("edit")) {
        const span = li.querySelector(".productName");
        if (li.querySelector("input")) return;

        const input = document.createElement("input");
        input.value = span.textContent;
        span.replaceWith(input);
        input.focus();

        function saveEdit() {
            if (!input.isConnected) return;

            const newSpan = document.createElement("span");
            newSpan.className = "productName";
            newSpan.textContent = input.value.trim() || "Unnamed Product";
            input.replaceWith(newSpan);
        }

        // blur fires when the user clicks outside the edited input.
        input.addEventListener("blur", saveEdit);
        input.addEventListener("keydown", function (keyEvent) {
            if (keyEvent.key === "Enter") input.blur();
            if (keyEvent.key === "Escape") {
                input.value = span.textContent;
                input.blur();
            }
        });
    }
});