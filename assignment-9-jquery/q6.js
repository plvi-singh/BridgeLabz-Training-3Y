$(document).ready(function () {
  let notificationsEnabled = false;

  // Scenario 5: Dynamically insert a success message into the DOM on each action
  function showSuccessMessage(message) {
    const $msg = $('<div class="toast-success"></div>').text(message).hide();
    $("#feedback-area").empty().append($msg);
    $msg.fadeIn(200);
  }

  // Scenario 1: Subscribe -> enable notifications
  $("#btn-subscribe").on("click", function () {
    notificationsEnabled = true;
    $("#notif-status")
      .text("Enabled")
      .addClass("active");
    showSuccessMessage("Success: Notifications have been enabled!");
  });

  // Scenario 2: Unsubscribe -> disable notifications
  $("#btn-unsubscribe").on("click", function () {
    notificationsEnabled = false;
    $("#notif-status")
      .text("Disabled")
      .removeClass("active");
    $(".topic-item").removeClass("subscribed");
    showSuccessMessage("Success: Notifications have been disabled.");
  });

  // Handler function attached to topic names using .on()
  function handleTopicToggle() {
    if (!notificationsEnabled) {
      showSuccessMessage("Enable notifications via Subscribe first, or topic preference saved as inactive.");
    }
    const $item = $(this).closest(".topic-item");
    $item.toggleClass("subscribed");
    const topicTitle = $(this).text();
    const state = $item.hasClass("subscribed") ? "subscribed to" : "unsubscribed from";
    showSuccessMessage("Success: You " + state + ' "' + topicTitle + '".');
  }

  // Attach click handler to all initial topic items using .on()
  $(".topic-name").on("click", handleTopicToggle);

  // Scenario 3: Dynamically add new subscription topics and attach .on() click events
  $("#add-topic-form").on("submit", function (event) {
    event.preventDefault();
    const topicText = $.trim($("#new-topic-input").val());
    if (!topicText) {
      return;
    }

    const $newName = $('<span class="topic-name"></span>').text(topicText);
    const $removeBtn = $('<button type="button" class="btn-remove-topic danger">Remove</button>');
    const $newItem = $('<li class="topic-item"></li>')
      .append($newName)
      .append($('<div class="topic-actions"></div>').append($removeBtn));

    // Attach click event directly using .on() on the newly created element
    $newName.on("click", handleTopicToggle);

    $("#topic-list").append($newItem);
    $("#new-topic-input").val("");
    showSuccessMessage('Success: Added new topic "' + topicText + '" with .on() handler.');
  });

  // Scenario 4: Remove specific subscription -> detach event using .off() before removing
  $("#topic-list").on("click", ".btn-remove-topic", function () {
    const $item = $(this).closest(".topic-item");
    const topicTitle = $item.find(".topic-name").text();

    // Explicitly detach click event handler using .off()
    $item.find(".topic-name").off("click");
    $item.fadeOut(200, function () {
      $(this).remove();
    });

    showSuccessMessage('Success: Detached event (.off) and removed "' + topicTitle + '".');
  });
});
