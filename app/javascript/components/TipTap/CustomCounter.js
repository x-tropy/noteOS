import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import Counter from "./Counter.vue";

export default Node.create({
  name: "vueComponent",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 10,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'counter' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "counter",
      {
        count: HTMLAttributes.count,
        class: "counter-wrapper",
      },
      ["label", "Vue Component"],
      [
        "p",
        [
          "button",
          `This button has been clicked ${HTMLAttributes.count} times`,
        ],
      ],
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Counter);
  },
});
