// Q3 – Multi-Step Form with Next/Back and Validation
const steps = Array.from(document.querySelectorAll(".step"));
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const summary = document.getElementById("summary");
let currentStep = 0;

function showStep() {
    steps.forEach((step, index) => {
        step.hidden = index !== currentStep;
    });
    backButton.hidden = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? "Submit" : "Next";
}

nextButton.addEventListener("click", function () {
    const input = steps[currentStep].querySelector("input");

    if (!input.checkValidity()) {
        input.reportValidity();
        return;
    }

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep();
    } else {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        summary.textContent = "Registration complete! Name: " + name +
                              " | Email: " + email;
        summary.hidden = false;
        document.getElementById("multiStepForm").hidden = true;
    }
});

backButton.addEventListener("click", function () {
    if (currentStep > 0) {
        currentStep--;
        showStep();
    }
});

showStep();