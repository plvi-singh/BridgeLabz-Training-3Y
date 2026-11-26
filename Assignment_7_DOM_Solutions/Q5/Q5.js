// Q5 – Image Gallery with Modal Preview
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const largeImage = document.getElementById("largeImage");
const closeButton = document.getElementById("closeButton");

gallery.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG") {
        largeImage.src = event.target.src;
        largeImage.alt = event.target.alt;
        modal.classList.add("show");
    }
});

// Clicking the dark area outside the modal content closes it.
modal.addEventListener("click", function () {
    modal.classList.remove("show");
});

// Prevent clicks inside the modal from bubbling to the backdrop.
modalContent.addEventListener("click", function (event) {
    event.stopPropagation();
});

closeButton.addEventListener("click", function () {
    modal.classList.remove("show");
});