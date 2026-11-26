// Q6 – Real-Time Table Filter Using input Event
const searchInput = document.getElementById("searchInput");
const rows = document.querySelectorAll("#studentRows tr");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        const matches = rowText.includes(searchText);

        row.hidden = !matches;
        if (matches) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;
});