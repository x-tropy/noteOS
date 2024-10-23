import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["button"];

  connect() {
    window.addEventListener("scroll", this.toggleButtonVisibility.bind(this));
  }

  disconnect() {
    window.removeEventListener("scroll", this.toggleButtonVisibility.bind(this));
  }

  toggleButtonVisibility() {
    const viewportHeight = window.innerHeight;
    const scrollableHeight = document.documentElement.scrollHeight;

    // Show button if the scrollable content is larger than 2x the viewport height
    if (scrollableHeight > viewportHeight * 2) {
      if (window.scrollY > viewportHeight) {
        this.element.classList.remove("hidden");
      } else {
        this.element.classList.add("hidden");
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
