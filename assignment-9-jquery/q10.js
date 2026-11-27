$(document).ready(function () {
  // At least 5 existing registered emails used to validate uniqueness
  const registeredEmails = [
    "alice@example.com",
    "bob@example.com",
    "carol@example.com",
    "david@example.com",
    "elena@example.com"
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Scenario 5: Dynamically style invalid fields with red border using .css(), or reset valid ones
  function setFieldState($input, $errorEl, errorMessage) {
    if (errorMessage) {
      $input.css("border-color", "#dc2626");
      $errorEl.text(errorMessage);
      return false;
    } else {
      $input.css("border-color", "#16a34a");
      $errorEl.text("");
      return true;
    }
  }

  // Scenario 1: Validate Name field -> must not be empty
  function validateName() {
    const $name = $("#reg-name");
    const val = $.trim($name.val());
    if (!val) {
      return setFieldState($name, $("#err-name"), "Name field cannot be empty.");
    }
    return setFieldState($name, $("#err-name"), "");
  }

  // Scenario 2: Validate Email field -> valid format and uniqueness
  function validateEmail() {
    const $email = $("#reg-email");
    const val = $.trim($email.val()).toLowerCase();
    if (!val) {
      return setFieldState($email, $("#err-email"), "Email address is required.");
    }
    if (!emailRegex.test(val)) {
      return setFieldState($email, $("#err-email"), "Please enter a valid email address.");
    }
    if (registeredEmails.indexOf(val) !== -1) {
      return setFieldState($email, $("#err-email"), "This email is already registered. Choose a unique email.");
    }
    return setFieldState($email, $("#err-email"), "");
  }

  // Scenario 3: Validate Password -> minimum 8 characters
  function validatePassword() {
    const $password = $("#reg-password");
    const val = $password.val();
    if (val.length < 8) {
      return setFieldState($password, $("#err-password"), "Password must be at least 8 characters long.");
    }
    return setFieldState($password, $("#err-password"), "");
  }

  // Live validation as the user types or leaves fields
  $("#reg-name").on("keyup blur", validateName);
  $("#reg-email").on("keyup blur", validateEmail);
  $("#reg-password").on("keyup blur", validatePassword);

  // Form submission validation
  $("#registration-form").on("submit", function (event) {
    event.preventDefault();
    $("#form-success").hide();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // Scenario 4: Show success message if all fields are valid
    if (isNameValid && isEmailValid && isPasswordValid) {
      const nameVal = $.trim($("#reg-name").val());
      const emailVal = $.trim($("#reg-email").val()).toLowerCase();

      registeredEmails.push(emailVal);
      $("#registered-emails-list").append($("<li></li>").text(emailVal));

      $("#form-success")
        .text("Registration successful! Welcome, " + nameVal + " (" + emailVal + ").")
        .fadeIn(200);

      this.reset();
      $("#reg-name, #reg-email, #reg-password").css("border-color", "#cbd5e1");
    }
  });
});
