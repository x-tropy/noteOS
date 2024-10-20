import { titleCase } from "title-case";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["title"];

  connect() {}

  handleBlur() {
    const newTitle = titleCase(this.title);
    const h1 = document.querySelector(".tiptap[contenteditable] h1");
    if (h1.innerText.trim() === "") {
      h1.innerText = newTitle;
    }
  }

  get title() {
    return this.titleTarget.value;
  }
}
