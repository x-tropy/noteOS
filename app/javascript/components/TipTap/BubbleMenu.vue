<script setup>
import { Editor } from "@tiptap/vue-3";
import { IconBold, IconItalic, IconStrikethrough, IconCode, IconHighlight } from "@tabler/icons-vue";
import { BubbleMenu } from "@tiptap/vue-3";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
</script>

<template>
  <bubble-menu
    class="bubble-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      @click.prevent="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <IconBold />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <IconItalic />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <IconStrikethrough />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleHighlight().run()"
      :class="{ 'is-active': editor.isActive('highlight') }"
    >
      <IconHighlight />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      <IconCode />
    </button>
  </bubble-menu>
</template>
