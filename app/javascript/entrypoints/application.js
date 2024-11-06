import "../controllers";
import { createApp } from "vue";
import Tiptap from "../components/Tiptap.vue";
import TableOfContents from "../components/TableOfContents.vue";
import Rails from "@rails/ujs";
import PrimeVue from "primevue/config";
import {
  highlightCodeBlocks,
  prependLanguageLabels,
} from "../components/TipTap/preprocess.js";

Rails.start();

document.addEventListener("DOMContentLoaded", () => {
  const editorElement = document.getElementById("tiptap-editor");
  if (editorElement) {
    const app = createApp(Tiptap, {
      // load database content into editor
      initialContent: editorElement.dataset.content,

      // callback: used to update
      onUpdateContent: (content) => {
        document.getElementById("tiptap-hidden").value = content;
      },
    });
    app.use(PrimeVue, { unstyled: true });
    app.mount("#tiptap-editor");
  }

  // TOC
  const tocElement = document.getElementById("table-of-contents")
  if (tocElement) {
    const toc = createApp(TableOfContents, {

    })
    toc.mount('#table-of-contents')
  }

  // Preprocess: View Mode Only
  highlightCodeBlocks();
  prependLanguageLabels();
});
