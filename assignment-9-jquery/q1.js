$(document).ready(function () {
  // Collection of at least 5 motivational quotes to cycle through
  const motivationalQuotes = [
    "Believe you can and you're halfway there.",
    "Small daily improvements over time lead to stunning results.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Consistency beats intensity when building lasting skills.",
    "Every expert was once a beginner who refused to quit."
  ];

  let quoteIndex = 0;

  // Helper to compute a time-of-day greeting based on current local hour
  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning, Visitor! Ready to start a productive day?";
    } else if (hour < 17) {
      return "Good Afternoon, Visitor! Keep up the great momentum!";
    } else {
      return "Good Evening, Visitor! Hope you had a wonderful day!";
    }
  }

  // Scenario 1: Display personalized greeting on page load based on time of day
  $("#greeting-banner").text(getTimeBasedGreeting());

  // Scenario 2: Clicking "Change Greeting" updates the greeting text to a motivational quote
  $("#btn-change-greeting").on("click", function () {
    const quote = motivationalQuotes[quoteIndex];
    $("#greeting-banner").text('"' + quote + '"');
    // Advance index cyclically through the 5 quotes
    quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;
  });

  // Optional reset button to restore the time-based greeting
  $("#btn-reset-greeting").on("click", function () {
    $("#greeting-banner").text(getTimeBasedGreeting());
  });

  // Scenario 3: Toggle visibility of the welcome message using another button
  $("#btn-toggle-welcome").on("click", function () {
    $("#welcome-message").toggle(250);
  });

  // Scenario 4: Show an alert displaying the current greeting text when clicked
  $("#greeting-banner").on("click", function () {
    alert("Greeting clicked: " + $(this).text());
  });
});
