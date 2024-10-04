<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// Create a ref to hold the editor instance
const editor = ref(null)

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [StarterKit],
  })
})

onBeforeUnmount(() => {
  // Destroy the editor when the component is unmounted
  editor.value.destroy()
})
</script>
