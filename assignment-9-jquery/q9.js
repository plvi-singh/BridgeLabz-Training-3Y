// Scenario 5: Use jQuery.noConflict(true) so both jQuery versions operate simultaneously
// jQuery 3.7.1 was loaded second, so the first noConflict(true) returns 3.7.1 and restores 1.12.4.
const $jq2 = jQuery.noConflict(true);
// Calling noConflict(true) again returns jQuery 1.12.4 and releases the global $ / jQuery symbols.
const $jq1 = jQuery.noConflict(true);

// =========================================================================
// JQUERY VERSION 1 (1.12.4): Carousel Slider Rotation & Active Widget Highlight
// =========================================================================
$jq1(document).ready(function () {
  $jq1("#v1-status").text("Version 1 Active: jQuery " + $jq1.fn.jquery);

  // Scenario 1: Version 1 handles carousel slider rotation (auto + buttons)
  const $slides = $jq1(".carousel-slide");
  let slideIdx = 0;

  function showSlide(index) {
    slideIdx = (index + $slides.length) % $slides.length;
    $slides.removeClass("active").eq(slideIdx).addClass("active");
  }

  $jq1("#next-slide").on("click", function () {
    showSlide(slideIdx + 1);
  });

  $jq1("#prev-slide").on("click", function () {
    showSlide(slideIdx - 1);
  });

  // Rotate carousel automatically every 4 seconds
  setInterval(function () {
    showSlide(slideIdx + 1);
  }, 4000);

  // Scenario 3: Version 1 highlights the active widget on click
  $jq1(".widget-card").on("click", function () {
    $jq1(".widget-card").removeClass("active-widget");
    $jq1(this).addClass("active-widget");
  });
});

// =========================================================================
// JQUERY VERSION 2 (3.7.1): Modal Notification Popups & Hover Tooltips
// =========================================================================
$jq2(document).ready(function () {
  $jq2("#v2-status").text("Version 2 Active: jQuery " + $jq2.fn.jquery);

  // Scenario 2: Version 2 manages modal popups for notifications
  $jq2("#btn-open-modal").on("click", function () {
    $jq2("#notif-modal").css("display", "flex").hide().fadeIn(200);
  });

  $jq2("#btn-close-modal").on("click", function () {
    $jq2("#notif-modal").fadeOut(200);
  });

  $jq2("#notif-modal").on("click", function (event) {
    if (event.target === this) {
      $jq2(this).fadeOut(200);
    }
  });

  // Scenario 4: Version 2 attaches tooltips on hover over dashboard widgets
  const $tooltip = $jq2("#v2-tooltip");

  $jq2(".widget-card").on("mouseenter", function (event) {
    const tipText = $jq2(this).data("tooltip");
    $tooltip
      .text(tipText)
      .css({ top: event.clientY + 14 + "px", left: event.clientX + 14 + "px" })
      .stop(true, true)
      .fadeIn(120);
  });

  $jq2(".widget-card").on("mousemove", function (event) {
    $tooltip.css({ top: event.clientY + 14 + "px", left: event.clientX + 14 + "px" });
  });

  $jq2(".widget-card").on("mouseleave", function () {
    $tooltip.stop(true, true).fadeOut(100);
  });
});
