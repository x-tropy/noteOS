import "../controllers";
import { createApp } from "vue";
import Tiptap from "../components/Tiptap.vue";
import Rails from "@rails/ujs";
import {highlightCodeBlocks, prependLanguageLabels} from "../components/TipTap/preprocess.js";
import S3 from "../utils/s3.js"
import {ListBucketsCommand} from "@aws-sdk/client-s3";

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
    app.mount("#tiptap-editor");
    highlightCodeBlocks()
    prependLanguageLabels()
  }
});

// console.log(await S3.send(new ListBucketsCommand("")));
