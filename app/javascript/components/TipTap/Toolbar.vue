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
      <input type="file" multiple name="Upload" @change.prevent="uploadFile" />
    </div>
    <div class="button-group">
      <button @click.prevent="alignCenter(editor)">center</button>
      <button @click.prevent="alignLeft(editor)">left</button>
    </div>
  </div>
</template>

<script setup>
import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import {
  setLink,
  unsetLink,
  externalImage,
  scrapeImage,
  alignCenter,
  alignLeft,
} from "./ToolbarCommands.js";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

const selection = ref({ from: 0, to: 0 });

async function uploadFile(event) {
  selection.value = {
    from: props.editor.state.selection.from,
    to: props.editor.state.selection.to,
  };
  for (const file of Array.from(event.target.files)) {
    const formData = new FormData();
    formData.append("item[contents]", file);
    formData.append("item[name]", "Image Upload");

    const response = await fetch("/items", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      // Insert the image into the Tiptap editor
      props.editor.chain().focus().setImage({ src: data.url }).run();
      props.editor.commands.setTextSelection({
        from: selection.value.from + 1,
        to: selection.value.to + 1,
      });
    } else {
      console.error("Image upload failed");
    }
  }
}
</script>
