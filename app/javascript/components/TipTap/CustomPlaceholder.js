import { Placeholder } from "@tiptap/extension-placeholder";

const CustomPlaceholder = Placeholder.configure({
  includeChildren: true,
  placeholder: ({ node }) => {
    const name = node.type.name;
    switch (name) {
      case "heading":
        return "New Title";
      case "paragraph":
        return "type / for more commands";
      case "detailsSummary":
        return "Summary";
      default:
        return null;
    }
  },
});

export default CustomPlaceholder;
