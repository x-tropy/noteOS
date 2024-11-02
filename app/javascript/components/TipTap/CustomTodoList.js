import { mergeAttributes, Node } from "@tiptap/core";

export default Node.create({
  name: "todoList",

  // provide options for configuration
  addOptions() {
    return {
      itemTypeName: "todoItem",
      HTMLAttributes: {},
    };
  },

  group: "block list",

  // todoList has many todoItems
  content() {
    return `${this.options.itemTypeName}+`;
  },

  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": this.name,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleTodoList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTodoList(),
    };
  },
});
