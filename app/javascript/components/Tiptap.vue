<template>
  <div v-if="editor">
    <Toolbar :editor="editor" />
    <editor-content :editor="editor" />
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

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content:
      props.initialContent ||
      `<h1>Title</h1>
<p></p>`,
    extensions: [
      CustomStarterKit,
      CustomTypography,
      Highlight,
      CustomCodeBlock,
      CustomLink,
      Image,
      CustomFileHandler,
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>
