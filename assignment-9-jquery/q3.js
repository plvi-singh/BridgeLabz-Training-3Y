$(document).ready(function () {
  // Scenario 1: Click on a question -> toggle its corresponding answer visibility
  $(".faq-question").on("click", function () {
    $(this).next(".faq-answer").slideToggle(200);
  });

  // Scenario 2: Hover -> change question text color
  $(".faq-question").hover(
    function () {
      $(this).css("color", "#2563eb");
    },
    function () {
      $(this).css("color", "#0f172a");
    }
  );

  // Scenario 3: Double-click on any question -> collapse all open answers
  $(".faq-question").on("dblclick", function () {
    $(".faq-answer").slideUp(200);
  });

  // Scenario 4: Focus on an input inside an answer -> highlight its parent question
  $(".faq-input").on("focus", function () {
    $(this).closest(".faq-item").find(".faq-question").css("background-color", "#fef08a");
  });

  // Scenario 5: Blur from input -> reset the parent question's background color
  $(".faq-input").on("blur", function () {
    $(this).closest(".faq-item").find(".faq-question").css("background-color", "#ffffff");
  });
});
