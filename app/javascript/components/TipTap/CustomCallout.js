import { Node, mergeAttributes } from "@tiptap/core";
import { textblockTypeInputRule } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import Callout from "~/components/TipTap/Callout.vue";

export default Node.create({
  name: "callout",
  group: "block",
  draggable: true,
  content: "inline*",

  addAttributes() {
    return {
      intent: {
        default: "info",
      },
      content: {
        default: "content"
      }
    };
  },

  parseHTML() {
    return [{ tag: "callout" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    let children = [];
    // Check if there's a heading and set it appropriately
    if (node.attrs.intent) {
      children.push(["h3", { contenteditable: "true" }, node.attrs.intent]); // Use the intent for the heading
    } else {
      // You could set a default heading if needed
      children.push(["h3", { contenteditable: "true" }, "Default Heading"]);
    }
    children.push(["p", { contenteditable: "true" }, "Content of callout"]); // Add default content

    return ["callout", mergeAttributes(HTMLAttributes), ...children];
  },

  addCommands() {
    return {
      setCallout:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-y": () => this.editor.commands.setCallout(),
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^\>(\w+)\s$/, // Matches **warn with a trailing space
        type: this.type, // Reference to the callout node type
        getAttributes: (match) => {
          const [, intent] = match;
          console.log("Input rule matched:", intent);
          return { intent }; // Set the "type" attribute to the matched keyword
        },
      }),
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Callout);
  },
});
