import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import ImageWithCaption from "./ImageWithCaption.vue";

export default Node.create({
  name: "imageWithCaption",
  group: "block",
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      caption: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [{ tag: "figure" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const children = [
      ["img", { src: node.attrs.src }],
    ];

    // Add figcaption only if caption is not empty
    if (node.attrs.caption.trim()) {
      children.push(["figcaption", node.attrs.caption]);
    }

    return ["figure", mergeAttributes(HTMLAttributes), ...children];
  },

  addCommands() {
    return {
      setImageWithCaption:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageWithCaption);
  },
});
