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
import CustomImage from "./TipTap/CustomImage.js"
import {
  ensureThreeEmptyParagraphs,
  periodicTask,
} from "./TipTap/EditorTasks.js";

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
          class: 'image',
        },
      }),
      CustomImage,
      TextAlign.configure({
        alignments: ['left', 'center'],
        types: ['paragraph', 'heading'],
      })
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
      if (!isUpdating.value) {
        ensureThreeEmptyParagraphs(editor, isUpdating);
      }
    },
  });
});

const intervalId = periodicTask(editor);

onBeforeUnmount(() => {
  editor.value.destroy();
  clearInterval(intervalId);
});
</script>
