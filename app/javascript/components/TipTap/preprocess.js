import hljs from "highlight.js";
import hljsVue from "./hljsVue.js";
import crelt from "crelt";

const IconCode =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE4MF8zKSI+CjxwYXRoIGQ9Ik01LjgzMzMzIDYuNjY2NjdMMi41IDEwTDUuODMzMzMgMTMuMzMzMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQuMTY2NyA2LjY2NjY3TDE3LjUgMTBMMTQuMTY2NyAxMy4zMzMzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS42NjY3IDMuMzMzMzNMOC4zMzMzMyAxNi42NjY3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTgwXzMiPgo8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+";

hljs.registerLanguage("vue", hljsVue);

export const highlightCodeBlocks = () => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
};

export const prependLanguageLabels = () => {
  const preElements = document.querySelectorAll("pre");

  preElements.forEach((pre) => {
    const languageClass = Array.from(pre.querySelector("code").classList).find(
      (cls) => cls.startsWith("language-"),
    );
    const languageName = languageClass
      ? languageClass.replace("language-", "")
      : "plaintext";

    const wrapper = crelt(
      "div",
      { class: "code-wrapper relative scrollable" },
      crelt(
        "span",
        {
          class:
            "language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded",
        },
        crelt("img", {
          class: "mr-1",
          src: IconCode,
        }),
        languageName,
      ),
      pre.cloneNode(true),
    );

    // Replace the original <pre> element with the new wrapper
    pre.parentNode.replaceChild(wrapper, pre);
  });
};
