import { Placeholder } from "@tiptap/extension-placeholder";

const CustomPlaceholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "New Title";
    } else if (node.type.name === "paragraph") {
      return 'type / for more commands'
    }
  },
});

export default CustomPlaceholder;
