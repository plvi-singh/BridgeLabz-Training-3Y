$(document).ready(function () {
  // Scenario 1: Hide specific banners (per-banner Hide button or specific promo button)
  $(".btn-hide-one").on("click", function () {
    $(this).closest(".offer-banner").hide();
  });

  $("#btn-hide-specific").on("click", function () {
    $('.offer-banner[data-id="2"], .offer-banner[data-id="4"]').hide();
  });

  // Scenario 2: "Show" button -> show any hidden banners
  $("#btn-show-all").on("click", function () {
    $(".offer-banner:hidden").show();
  });

  // Scenario 3: "Slide Up/Down" buttons -> collapse and expand banners
  $("#btn-slide-up").on("click", function () {
    $(".offer-banner").slideUp(350);
  });

  $("#btn-slide-down").on("click", function () {
    $(".offer-banner").slideDown(350);
  });

  // Scenario 4: "Fade In/Fade Out" buttons -> show/hide banners gradually
  $("#btn-fade-out").on("click", function () {
    $(".offer-banner").fadeOut(500);
  });

  $("#btn-fade-in").on("click", function () {
    $(".offer-banner").fadeIn(500);
  });

  // Scenario 5: Automatically rotate through banners every 5 seconds using .fadeOut() / .fadeIn()
  const $slides = $(".rotator-slide");
  let currentSlide = 0;

  setInterval(function () {
    const $active = $slides.eq(currentSlide);
    currentSlide = (currentSlide + 1) % $slides.length;
    const $next = $slides.eq(currentSlide);

    // Fade out current banner, then fade in the next banner
    $active.fadeOut(450, function () {
      $next.fadeIn(450);
    });
  }, 5000);
});
