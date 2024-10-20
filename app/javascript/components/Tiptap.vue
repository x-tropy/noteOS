<template>
  <div v-if="editor">
    <Toolbar :editor="editor" />
    <editor-content :editor="editor" ref="editorContent" />
  </div>
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
const editorContentRef = ref(null);

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
    },
  });

    // Replace 'your-selector-here' with the correct selector to target the child element
    // const childElement = editorContentRef.value.querySelector(
    //   "div[contenteditable]",
    // );
    // console.log({ childElement });
});

onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>
