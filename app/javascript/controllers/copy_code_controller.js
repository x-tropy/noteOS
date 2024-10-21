import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["code", "button"];

  get codeText() {
    return this.codeTarget.innerText;
  }

  copyToClipboard(e) {
    e.preventDefault()
    navigator.clipboard.writeText(this.codeText).then(() => {
      const originalText = this.buttonTarget.innerText;
      this.buttonTarget.innerText = 'Copied';
      this.buttonTarget.disabled = true
      this.buttonTarget.classList.toggle("copy-success")
      setTimeout(() => {
        this.buttonTarget.innerText = originalText;
        this.buttonTarget.classList.toggle("copy-success")
        this.buttonTarget.disabled = false
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }
}
