<script setup>
import { Editor } from "@tiptap/vue-3";
import { setLink, unsetLink, externalImage, scrapeImage, alignCenter, alignLeft } from "./ToolbarCommands.js";

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
        :class="{ 'font-bold': editor.isActive('link') }"
      >
        Set link
      </button>

      <button
        @click.prevent="unsetLink(editor)"
        :disabled="!editor.isActive('link')"
      >
        Unset link
      </button>
    </div>
    <div class="button-group" data-controller="image-scrape">
      <button @click.prevent="externalImage(editor)">External image</button>
      <button @click.prevent="scrapeImage(editor)">Scrape image</button>
    </div>
    <div class="button-group">
      <button @click.prevent="alignCenter(editor)">center</button>
      <button @click.prevent="alignLeft(editor)">left</button>
    </div>
  </div>
</template>


<!--<div data-controller="image">-->
<!--<input type="text" data-image-target="nameInput" placeholder="Item Name">-->
<!--<input type="text" data-image-target="urlInput" placeholder="Paste Image URL">-->
<!--<button data-action="click->image#download">Save Image</button>-->
<!--</div>-->
