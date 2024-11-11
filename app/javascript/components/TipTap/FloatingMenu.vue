<script setup>
import { FloatingMenu } from "@tiptap/vue-3";
import { Editor } from "@tiptap/vue-3";
import {
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconSection,
  IconListCheck,
  IconBlockquote,
} from "@tabler/icons-vue";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
</script>

<template>
  <floating-menu
    class="floating-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      <IconH1 />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      <IconH2 />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      <IconH3 />
    </button>
    <button
        class="border-l border-light"
      @click.prevent="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      <IconList />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      <IconListNumbers />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleTaskList().run()"
      :class="{ 'is-active': editor.isActive('taskList') }"
    >
      <IconListCheck />
    </button>
    <button
      class="border-l border-light"
      @click.prevent="editor.chain().focus().setHorizontalRule().run()"
      :class="{ 'is-active': editor.isActive('horizontalRule') }"
    >
      <IconSection />
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      <IconBlockquote />
    </button>
  </floating-menu>
</template>
