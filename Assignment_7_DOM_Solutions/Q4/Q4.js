// Q4 – Theme Switcher Using Attribute Manipulation
const themeButtons = document.querySelectorAll("button[data-choice]");

themeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const selectedTheme = button.getAttribute("data-choice");

        // setAttribute stores the selected theme on the body element.
        document.body.setAttribute("data-theme", selectedTheme);
        document.body.setAttribute("data-current-theme", selectedTheme);

        // Add a theme class as requested.
        document.body.className = "theme-" + selectedTheme;
    });
});