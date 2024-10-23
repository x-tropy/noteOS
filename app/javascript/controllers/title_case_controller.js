import { titleCase } from "title-case";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["informal", "title", "hiddenContent"];

  connect() {}

  updateHidden() {
    const formalTitle = titleCase(this.informalTarget.value.trim());
    console.log(formalTitle)
    this.titleTarget.value = formalTitle;
    this.hiddenContentTarget.value = `<h1>${formalTitle}</h1>
<p></p>
<p></p>
<p></p>`;
  }
}
