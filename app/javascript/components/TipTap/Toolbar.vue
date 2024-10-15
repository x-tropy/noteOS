<script setup>
import { Editor } from "@tiptap/vue-3";
import { setLink, unsetLink, addImage } from "./ToolbarCommands.js";

const props = defineProps({
  editor: {
    type: Editor,
  },
});
</script>

<template>
  <div class="control-group">
    <div class="button-group">
      <button
        @click.prevent="setLink(editor)"
        :class="{ 'is-active': editor.isActive('link') }"
      >
        Set link
      </button> |
      <button
        @click.prevent="unsetLink(editor)"
        :disabled="!editor.isActive('link')"
      >
        Unset link
      </button> |
      <button
        @click.prevent="addImage(editor)"
      >
        Add image
      </button> |
    </div>
  </div>
</template>

<style scoped>
.is-active {
  @apply font-bold;
}
</style>
