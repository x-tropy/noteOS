<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

const lowlight = createLowlight(all);

const props = defineProps({
  initialContent: {
    type: String,
    default: "<p>(default)</p>",
  },
  onUpdateContent: {
    type: Function,
    required: true,
  },
});

// Create a ref to hold the editor instance
const editor = ref(null);

onMounted(() => {
  // Initialize the editor when the component is mounted
  editor.value = new Editor({
    content: props.initialContent,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: ({ editor }) => {
      props.onUpdateContent(editor.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  // Destroy the editor when the component is unmounted
  editor.value.destroy();
});
</script>
