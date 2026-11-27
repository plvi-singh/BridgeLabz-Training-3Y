$(document).ready(function () {
  // Scenario 4: Apply distinct styles to products with a discount using an attribute selector
  $("[data-discount]").css({
    "border-color": "#10b981",
    "box-shadow": "inset 0 4px 0 0 #10b981"
  });

  // Scenario 1 & Scenario 5:
  // Click on a product card -> highlight background; also alert if product is out of stock (via data attribute)
  $(".product-card").on("click", function () {
    $(this).toggleClass("highlighted");

    // Read the data-stock attribute using .data()
    if ($(this).data("stock") === "out") {
      const productName = $(this).find(".product-title").text();
      alert("Sorry! '" + productName + "' is currently out of stock.");
    }
  });

  // Scenario 2: Hover over a product -> show additional product details smoothly
  $(".product-card").hover(
    function () {
      $(this).find(".product-details").stop(true, true).slideDown(180);
    },
    function () {
      $(this).find(".product-details").stop(true, true).slideUp(180);
    }
  );

  // Scenario 3: Clicking the "Favorite" icon toggles the "selected" class
  $(".fav-btn").on("click", function (event) {
    // Prevent card click handler from firing when only clicking the favorite icon
    event.stopPropagation();
    $(this).toggleClass("selected");
  });
});
