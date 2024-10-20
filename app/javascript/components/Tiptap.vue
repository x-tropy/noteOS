<template>
  <div v-if="editor">
    <Toolbar :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, useTemplateRef, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import CustomCodeBlock from "./TipTap/CustomCodeBlock.js";
import CustomStarterKit from "./TipTap/CustomStarterKit.js";
import CustomTypography from "./TipTap/CustomTypography.js";
import Highlight from "@tiptap/extension-highlight";
import Toolbar from "./TipTap/Toolbar.vue";
import CustomLink from "./TipTap/CustomLink.js";
import Image from "@tiptap/extension-image";
import CustomFileHandler from "./TipTap/CustomFileHandler.js";
import CustomPlaceholder from "./TipTap/CustomPlaceholder.js";

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
const editorWrapper = useTemplateRef("editor-wrapper");

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content:
      props.initialContent ||
      `<h1></h1>
<p></p>
<p></p>
<p></p>`,
    extensions: [
      CustomStarterKit,
      CustomTypography,
      Highlight,
      CustomCodeBlock,
      CustomLink,
      Image,
      CustomFileHandler,
      CustomPlaceholder,
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
      if (!isUpdating) {
        ensureThreeEmptyParagraphs(editor);
      }
    },
  });
});

let isUpdating = false;

function ensureThreeEmptyParagraphs(editor) {
  const content = editor.getHTML();

  // Check if the content ends with exactly 3 empty <p> tags
  if (!content.endsWith("<p></p><p></p><p></p>")) {
    isUpdating = true; // Prevent triggering onUpdate again
    const selection = saveSelection(editor)
    const updatedContent = content.replace(/(<p><\/p>)+$/, ""); // Remove trailing empty <p> tags
    editor.commands.setContent(`${updatedContent}<p></p><p></p><p></p>`, false); // Add 3 empty <p> tags at the end
    restoreSelection(selection, editor)
    isUpdating = false;
  }
}

function saveSelection(editor) {
  const selection = editor.state.selection;
  return { from: selection.from, to: selection.to };
}

function restoreSelection(selection, editor) {
  editor.commands.setTextSelection({ from: selection.from, to: selection.to });
}

onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>
