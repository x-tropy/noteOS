import Link from "@tiptap/extension-link";
import { Plugin } from "prosemirror-state";

export default Link.configure({
  openOnClick: false,
  defaultProtocol: "https",
  autolink: true,
  linkOnPaste: true,
}).extend({
  exitable: true,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mousedown: (view, event) => {
              if (event.target.tagName === "A" && event.ctrlKey) {
                window.open(event.target.href, "_blank");
                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
