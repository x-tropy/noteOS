import "../controllers";
// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log("Vite ⚡️ Rails");

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log(
  "Visit the guide for more information: ",
  "https://vite-ruby.netlify.app/guide/rails",
);

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

import { createApp } from "vue";
import Tiptap from "../components/Tiptap.vue";
import hljs from "highlight.js";
import CodeLanguageLabel from "../components/CodeLanguageLabel.vue";

document.addEventListener("DOMContentLoaded", () => {
  const editorElement = document.getElementById("tiptap-editor");
  if (editorElement) {
    const app = createApp(Tiptap, {
      // load database content into editor
      initialContent: editorElement.dataset.content,

      // callback: used to udpate
      onUpdateContent: (content) => {
        document.getElementById("hidden-article-content").value = content;
      },
    });
    app.mount("#tiptap-editor");
  }

  // reparse code syntax
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block); // Apply syntax highlighting
  });

  //   add code language label
  // Select all <pre> elements on the page
  const preElements = document.querySelectorAll("pre");

  preElements.forEach((pre) => {
    // Extract the language from the class list
    const languageClass = Array.from(pre.querySelector("code").classList).find(
      (cls) => cls.startsWith("language-"),
    );
    const languageName = languageClass
      ? languageClass.replace("language-", "")
      : "Unknown"; // Default to 'Unknown' if not found

    // Create a wrapper div
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper relative"; // Optional: add a class to the wrapper for styling

    // Create a span for the language name
    const span = document.createElement("span");
    span.className =
      "language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"; // Optional: add a class for styling
    span.textContent = languageName;

    // Append the <span> to the wrapper
    wrapper.appendChild(span);

    // Create a clone of the <pre> element and append it to the wrapper
    const preClone = pre.cloneNode(true);
    wrapper.appendChild(preClone);

    // Replace the original <pre> element with the new wrapper
    pre.parentNode.replaceChild(wrapper, pre);
  });
});
