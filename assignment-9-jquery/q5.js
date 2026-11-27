$(document).ready(function () {
  // Scenario 1: Click a manager -> highlight all of that manager's direct reports
  $(".manager").on("click", function () {
    $(this).next(".direct-reports").children(".employee-row").toggleClass("highlight-report");
  });

  // Scenario 2: Hover on an employee -> show contact info using .next()
  $(".employee").hover(
    function () {
      $(this).next(".contact-info").stop(true, true).slideDown(150);
    },
    function () {
      $(this).next(".contact-info").stop(true, true).slideUp(150);
    }
  );

  // Scenario 3: Click on a department title -> change background of all members using .children()
  $(".dept-title").on("click", function () {
    const $department = $(this).closest(".department");
    // Traverse down via .children() to the team list, direct reports, and member rows
    $department
      .children(".team-list")
      .children(".direct-reports")
      .children(".employee-row")
      .toggleClass("dept-member-bg");
  });

  // Scenario 4: Select a random employee -> highlight sibling employees
  $("#btn-random-emp").on("click", function () {
    $(".employee-row").removeClass("highlight-sibling");
    const $allEmployees = $(".employee-row");
    const randomIndex = Math.floor(Math.random() * $allEmployees.length);
    const $chosen = $allEmployees.eq(randomIndex);

    // Highlight sibling employee rows in the same team using .siblings()
    $chosen.siblings(".employee-row").addClass("highlight-sibling");
    // Scroll/flash subtle indicator by temporarily showing the chosen employee's contact
    $chosen.find(".contact-info").stop(true, true).slideDown(150);
  });

  // Scenario 5: Collapse/expand team using .parent() and .find()
  $(".btn-toggle-team").on("click", function (event) {
    event.stopPropagation();
    // Move up from button to .dept-header, then to .department via .parent(), and .find() .team-list
    $(this).parent().parent().find(".team-list").slideToggle(250);
  });

  // Utility button to clear highlights
  $("#btn-clear-highlights").on("click", function () {
    $(".employee-row").removeClass("highlight-report highlight-sibling dept-member-bg");
  });
});
