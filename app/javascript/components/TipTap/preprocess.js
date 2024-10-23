import hljs from "highlight.js";
import hljsVue from "./hljsVue.js";
import crelt from "crelt";

hljs.registerLanguage("vue", hljsVue);

export const highlightCodeBlocks = () => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
};

export const prependLanguageLabels = () => {
  const preElements = document.querySelectorAll("pre");

  preElements.forEach((preElement) => {
    const codeElement = preElement.querySelector("code");
    codeElement.setAttribute("data-copy-code-target", "code");
    const languageClass = Array.from(codeElement.classList).find((cls) =>
      cls.startsWith("language-"),
    );
    const languageName = languageClass
      ? languageClass.replace("language-", "")
      : "plaintext";

    const wrapper = crelt(
      "div",
      {
        class: "code-block-wrap relative scrollable",
        "data-controller": "copy-code",
      },
      crelt(
        "span",
        {
          class:
            "code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded",
        },
        languageName,
      ),
      crelt(
        "div",
        {
          class: "sticky top-0 h-12",
        },
        crelt(
          "button",
          {
            class: "copy-code-button",
            "data-copy-code-target": "button",
            "data-action": "click->copy-code#copyToClipboard",
          },
          "Copy",
        ),
      ),
      preElement.cloneNode(true),
    );

    // Replace the original <pre> element with the new wrapper
    preElement.parentNode.replaceChild(wrapper, preElement);
  });
};
