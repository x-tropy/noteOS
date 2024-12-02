<template>
  <template v-if="editor">
    <Toolbar :editor="editor" />
    <bubble-menu :editor="editor" />
    <floating-menu :editor="editor" />
    <editor-content :editor="editor" />
  </template>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Toolbar from "./TipTap/Toolbar.vue";
import FloatingMenu from "./TipTap/FloatingMenu.vue";
import BubbleMenu from "./TipTap/BubbleMenu.vue";
import CustomCodeBlock from "./TipTap/CustomCodeBlock.js";
import CustomStarterKit from "./TipTap/CustomStarterKit.js";
import CustomTypography from "./TipTap/CustomTypography.js";
import Highlight from "@tiptap/extension-highlight";
import CustomLink from "./TipTap/CustomLink.js";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import CustomFileHandler from "./TipTap/CustomFileHandler.js";
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
import {
  getHierarchicalIndexes,
  TableOfContents,
} from "@tiptap-pro/extension-table-of-contents";
import { Footnotes, FootnoteReference, Footnote } from "tiptap-footnotes";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import { Figma } from "tiptap-extension-figma";

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
      OrderedList.extend({
        addKeyboardShortcuts() {
          return {
            "Mod-o": () => this.editor.commands.toggleOrderedList(),
          };
        },
      }),
      BulletList.extend({
        addKeyboardShortcuts() {
          return {
            "Mod-l": () => this.editor.commands.toggleBulletList(),
          };
        },
      }),
      Document.extend({
        content: "block+ footnotes?",
      }),
      CustomTypography,
      Highlight,
      CustomCodeBlock,
      CustomLink,
      CustomFileHandler,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "image",
        },
      }),
      CustomImage,
      CustomAttachment,
      TextAlign.configure({
        alignments: ["left", "center", "right"],
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
        nested: true,
      }),
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate: (content) => {
        },
      }),
      Footnotes,
      Footnote,
      FootnoteReference,
      Figma,
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
      if (!isUpdating.value) {
        // ensureThreeEmptyParagraphs(editor, isUpdating);
      }
    },
  });
  // Object.keys(editor.value.schema.nodes).forEach(nodeName => {
  //   console.log(nodeName); // prints each node name
  // });
});

const intervalId = periodicTask(editor);

window.addEventListener("mousedown", (e) => {
  const anchorEle = e.target.closest(".ProseMirror a");
  if (anchorEle) {
    // disabled dynamically added style
    anchorEle.style = "";

    if (e.ctrlKey) {
      if (anchorEle.classList.contains("internal")) {
        window.open(anchorEle.href + "/edit", "_blank");
      } else {
        window.open(anchorEle.href, "_blank");
      }
    }
  }
});

window.addEventListener("mousemove", (e) => {
  const anchorEle = e.target.closest(".ProseMirror a");
  if (!anchorEle) return;

  if (!e.ctrlKey) anchorEle.style.cursor = "";
  if (anchorEle && e.ctrlKey) {
    anchorEle.style.cursor = "pointer";
  }
});

window.addEventListener("mouseout", (e) => {
  const anchorEle = e.target.closest(".ProseMirror a");
  if (anchorEle) {
    anchorEle.style.cursor = "";
  }
});

onBeforeUnmount(() => {
  editor.value.destroy();
  clearInterval(intervalId);
  // TODO: remove event listener
});
</script>
