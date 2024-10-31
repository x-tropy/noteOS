import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

export default [
  TaskList.configure({
    HTMLAttributes: {
      class: "task-list",
    },
    itemTypeName: "taskItem",
  }),
  TaskItem.configure({
    nested: true,
  }),
];
