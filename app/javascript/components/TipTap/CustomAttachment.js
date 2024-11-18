import { Node, mergeAttributes } from "@tiptap/core";

export default Node.create({
  name: "attachment",
  inline: false,
  group: "block",
  draggable: true,

  // Define the file attributes
  addAttributes() {
    return {
      src: {
        default: "",
      },
      title: {
        default: "File",
      },
      type: {
        default: "",
      },
      size: {
        default: "",
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
    let childrens;
    if (node.attrs.type.includes("audio")) {
      childrens = [
        ["span", { class: "audio-label" }, node.attrs.title],
        [
          "audio",
          { controls: true },
          ["source", { src: node.attrs.src, type: node.attrs.type }],
        ],
      ];
    } else if (node.attrs.type.includes("video")) {
      childrens = [
        ["span", { class: "video-label" }, node.attrs.title],
        [
          "video",
          { controls: true },
          ["source", { src: node.attrs.src, type: node.attrs.type }],
        ],
      ];
    } else {
      childrens = [
        [
          "a",
          {
            href: node.attrs.src,
            download: node.attrs.title, // Sets the download attribute
            target: "_blank", // Open in new tab for non-downloadable formats
            class: "download-link",
          },
          `${node.attrs.title} (${node.attrs.type})`,
          [
            "span",
            { class: "download-link-label" },
            `Type: ${node.attrs.type.split("/")[1]} | Size: ${node.attrs.size}`,
          ],
        ],
      ];
    }
    return ["attachment", mergeAttributes(HTMLAttributes), ...childrens];
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
