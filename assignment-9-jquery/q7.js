$(document).ready(function () {
  const $courses = $(".course-card");
  $("#total-count").text($courses.length);

  // Store original plain text for each title and description so highlighting can be cleanly re-applied
  $courses.each(function () {
    const $title = $(this).find(".course-title");
    const $desc = $(this).find(".course-desc");
    $title.data("original", $title.text());
    $desc.data("original", $desc.text());
  });

  // Helper to escape special regex characters in user search input
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Helper to wrap matched substrings and style them using .css()
  function highlightText($el, query) {
    const original = $el.data("original");
    if (!query) {
      $el.text(original);
      return;
    }
    const regex = new RegExp("(" + escapeRegex(query) + ")", "gi");
    const replaced = original.replace(regex, '<span class="highlight-match">$1</span>');
    $el.html(replaced);

    // Scenario 2: Highlight matched text using .css()
    $el.find(".highlight-match").css({
      "background-color": "#fef08a",
      "color": "#854d0e",
      "font-weight": "700",
      "padding": "0 2px",
      "border-radius": "3px"
    });
  }

  function filterCourses() {
    const query = $.trim($("#course-search").val());
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;

    $courses.each(function () {
      const $card = $(this);
      const $title = $card.find(".course-title");
      const $desc = $card.find(".course-desc");
      const combinedText = ($title.data("original") + " " + $desc.data("original")).toLowerCase();

      // Scenario 3: Toggle visibility of courses matching or not matching the search
      if (!lowerQuery || combinedText.indexOf(lowerQuery) !== -1) {
        highlightText($title, query);
        highlightText($desc, query);
        $card.show();
        visibleCount++;
      } else {
        $card.hide();
      }
    });

    // Scenario 4: Show count of matched courses dynamically
    $("#match-count").text(visibleCount);
  }

  // Scenario 1: Filter courses in real time using .keyup()
  $("#course-search").on("keyup", filterCourses);

  // Scenario 5: Clear search -> reset input and show all courses without highlights
  $("#btn-clear-search").on("click", function () {
    $("#course-search").val("");
    filterCourses();
    $("#course-search").focus();
  });
});
