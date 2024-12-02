import StarterKit from "@tiptap/starter-kit";

const CustomStarterKit = StarterKit.configure({
  document: false,
  codeBlock: false, // avoid conflict with CodeBlockLowlight
  heading: {
    levels: [1, 2, 3],
  },
  orderedList: false,
  bulletList: false
})

export default CustomStarterKit;
