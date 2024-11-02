<template>
  <template v-if="editor">
    <Toolbar :editor="editor" />
    <editor-content :editor="editor" />
  </template>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import CustomCodeBlock from "./TipTap/CustomCodeBlock.js";
import CustomStarterKit from "./TipTap/CustomStarterKit.js";
import CustomTypography from "./TipTap/CustomTypography.js";
import Highlight from "@tiptap/extension-highlight";
import Toolbar from "./TipTap/Toolbar.vue";
import CustomLink from "./TipTap/CustomLink.js";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CustomFileHandler from "./TipTap/CustomFileHandler.js";
import CustomPlaceholder from "./TipTap/CustomPlaceholder.js";
import {
  ensureThreeEmptyParagraphs,
  periodicTask,
} from "./TipTap/EditorTasks.js";
import CustomImage from "./TipTap/CustomImage.js";
import CustomAttachment from "./TipTap/CustomAttachment.js";
import CustomEmoji from "./TipTap/CustomEmoji.js";
import CustomTaskList from "./TipTap/CustomTaskList.js";
import CustomTable from "./TipTap/CustomTable.js";
import CustomDetails from "./TipTap/CustomDetails.js";
import YouTube from "@tiptap/extension-youtube";
import CustomCallout from "./TipTap/CustomCallout.js";
import CustomTodoList from "./TipTap/CustomTodoList.js";
import CustomTodoItem from "./TipTap/CustomTodoItem.js";

const props = defineProps({
  initialContent: {
    type: String,
  },
  onUpdateContent: {
    type: Function,
    required: true,
  },
});

const editor = ref(null);
const isUpdating = ref(false);

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content: props.initialContent || ``,
    extensions: [
      CustomStarterKit,
      CustomTypography,
      Highlight,
      CustomCodeBlock,
      CustomLink,
      CustomFileHandler,
      CustomPlaceholder,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "image",
        },
      }),
      CustomImage,
      CustomAttachment,
      TextAlign.configure({
        alignments: ["left", "center"],
        types: ["paragraph", "heading"],
      }),
      CustomEmoji,
      ...CustomTaskList,
      ...CustomTable,
      ...CustomDetails,
      YouTube.configure({
        HTMLAttributes: {
          class: "youtube",
        },
      }),
      CustomCallout,
      CustomTodoList.configure({
        HTMLAttributes: {
          class: "todo-list",
        },
        itemTypeName: "todoItem",
      }),
      CustomTodoItem.configure({
        nested: true
      }),
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
      if (!isUpdating.value) {
        ensureThreeEmptyParagraphs(editor, isUpdating);
      }
    },
  });
  // Object.keys(editor.value.schema.nodes).forEach(nodeName => {
  //   console.log(nodeName); // prints each node name
  // });
});

const intervalId = periodicTask(editor);

onBeforeUnmount(() => {
  editor.value.destroy();
  clearInterval(intervalId);
});
</script>
