import {titleCase} from "title-case";
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["title"]
    connect() {
    }

    handleBlur() {
        const titleValue = this.titleTarget.value;
        const newTitle = titleCase((titleValue))
        const firstH1 = document.querySelector(".tiptap[contenteditable] h1")
        if (firstH1.innerText.trim() === "") {
            firstH1.innerText = newTitle
        }
    }
}
