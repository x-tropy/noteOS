import { Placeholder } from "@tiptap/extension-placeholder";

const CustomPlaceholder = Placeholder.configure({
  placeholder: ({ node }) => {
    const name = node.type.name;
    switch (name) {
      case "heading":
        return "New Title";
      case "paragraph":
        return "type / for more commands";
      default:
        return null;
    }
  },
});

export default CustomPlaceholder;
