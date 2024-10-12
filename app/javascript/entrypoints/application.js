import "./application.css";
import "../controllers";
import { createApp } from "vue";
import Tiptap from "../components/Tiptap.vue";
import {highlightCodeBlocks, prependLanguageLabels} from "../components/TipTap/preprocess.js";

document.addEventListener("DOMContentLoaded", () => {
  const editorElement = document.getElementById("tiptap-editor");
  if (editorElement) {
    const app = createApp(Tiptap, {
      // load database content into editor
      initialContent: editorElement.dataset.content,

      // callback: used to update
      onUpdateContent: (content) => {
        document.getElementById("hidden-article-content").value = content;
      },
    });
    app.mount("#tiptap-editor");
  }
  highlightCodeBlocks()
  prependLanguageLabels()
});
