<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import CustomCodeBlock from "./TipTap/CustomCodeBlock.js";
import CustomStarterKit from "./TipTap/CustomStarterKit.js";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

const props = defineProps({
  initialContent: {
    type: String,
  },
  onUpdateContent: {
    type: Function,
    required: true,
  },
});

// Create a ref to hold the editor instance, so that it can be destroyed later
const editor = ref(null);

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content:
      props.initialContent || `<h1>Title</h1>`,
    extensions: [
      CustomStarterKit,
      Typography,
      Highlight,
      CustomCodeBlock,
      Link.configure({
        openOnClick: true,
        defaultProtocol: "https",
        autolink: true,
        linkOnPaste: true
      }),
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
