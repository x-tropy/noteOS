import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form", "submitButton"];

  connect() {}

  submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this.formTarget);

    // Disable the button to prevent multiple submissions
    this.submitButtonTarget.disabled = true;
    this.submitButtonTarget.value = "Saving...";

    // Send the request using fetch
    fetch(this.formTarget.action, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Update the DOM or show a success message
          console.log(data.message);
        } else {
          // Handle errors (e.g., display form validation messages)
          console.log(data.errors);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        // Re-enable the submit button
        setTimeout(() => {
          this.submitButtonTarget.value = "Saved";
        }, 1000);
        setTimeout(() => {
          this.submitButtonTarget.disabled = false;
          this.submitButtonTarget.value = "Save article";
        }, 2000);
      });
  }
}
