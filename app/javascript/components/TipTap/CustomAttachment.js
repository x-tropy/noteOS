import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "attachment",
  inline: true,
  group: "inline",
  draggable: true,

  // Define the file attributes
  addAttributes() {
    return {
      src: {
        default: null,
      },
      title: {
        default: "File",
      },
      type: {
        default: null,
      },
    };
  },

  // Define the schema
  parseHTML() {
    return [
      {
        tag: "attachment",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "attachment",
      mergeAttributes(HTMLAttributes),
      [
        "a",
        {
          href: node.attrs.src,
          download: node.attrs.title, // Sets the download attribute
          target: "_blank", // Open in new tab for non-downloadable formats
          class: "attachment",
          onclick: (event) => event.stopPropagation(),
        },
        `${node.attrs.title} (${node.attrs.type})`,
      ],
    ];
  },

  // Define commands
  addCommands() {
    return {
      setAttachment:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
