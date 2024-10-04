<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onMounted, onBeforeUnmount, ref } from "vue";


onMounted(() => {
  const editor = useEditor({
    content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
    extensions: [StarterKit],
  });
});
</script>
