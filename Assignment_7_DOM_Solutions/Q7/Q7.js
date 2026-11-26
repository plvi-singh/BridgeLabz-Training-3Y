// Q7 – Detect Mouse Path & Coordinates Logger
const trackingBox = document.getElementById("trackingBox");
const coordinates = document.getElementById("coordinates");

trackingBox.addEventListener("mousemove", function (event) {
    const rect = trackingBox.getBoundingClientRect();

    // clientX/clientY are viewport coordinates.
    coordinates.textContent =
        "clientX: " + event.clientX + ", clientY: " + event.clientY;
});

trackingBox.addEventListener("dblclick", function (event) {
    const rect = trackingBox.getBoundingClientRect();
    const dot = document.createElement("span");

    dot.className = "dot";
    dot.style.left = (event.clientX - rect.left) + "px";
    dot.style.top = (event.clientY - rect.top) + "px";

    trackingBox.appendChild(dot);
});