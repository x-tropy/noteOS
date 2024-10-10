import StarterKit from "@tiptap/starter-kit";

const CustomStarterKit = StarterKit.configure({
  codeBlock: false, // avoid conflict with CodeBlockLowlight
  heading: {
    levels: [1, 2, 3],
  },
}).extend({
  addKeyboardShortcuts() {
    return {
      "Mod-l": () => this.editor.commands.toggleBulletList(),
      "Mod-o": () => this.editor.commands.toggleOrderedList(),
    };
  },
});

export default CustomStarterKit;
