<script setup>
import Popover from "primevue/popover";
import Button from "primevue/button";
import { Editor } from "@tiptap/vue-3";
import { externalImage, scrapeImage } from "./ToolbarCommands.js";
import { IconPhotoPlus } from "@tabler/icons-vue";
import { ref, nextTick } from "vue";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

const addImagePopover = ref();
const toggleAddImagePopover = async (e) => {
  addImagePopover.value.toggle(e);
  await nextTick();
  textField.value?.focus();
};
const imageUrl = ref("");
const saveCopy = ref(true);
const useNative = ref(true);
const textField = ref();

function isValidURL(url) {
  const regex =
    /^(https?:\/\/)?(localhost|(\d{1,3}\.){3}\d{1,3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?$/;
  return regex.test(url);
}

const addImage = () => {
  imageUrl.value = imageUrl.value.trim();
  if (imageUrl.value === "" || !isValidURL(imageUrl.value)) return;
  if (saveCopy.value)
    scrapeImage(props.editor, imageUrl.value, useNative.value);
  else externalImage(props.editor, imageUrl.value);
};
</script>

<template>
  <button @click.prevent="toggleAddImagePopover" class="focus:outline-none">
    <IconPhotoPlus />
  </button>
  <Popover ref="addImagePopover" class="shadow-elevation bg-white p-4 rounded">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <label for="imageUrl">Paste image's URL</label>
        <input type="text" id="imageUrl" v-model="imageUrl" ref="textField" />
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          class="ring-0"
          id="saveCopy"
          v-model="saveCopy"
        />
        <label for="saveCopy" class="select-none">Save a copy to noteOS</label>
      </div>
      <div
        class="flex gap-2 items-center"
        :class="{ 'text-gray-400': !saveCopy }"
      >
        <input
          :disabled="!saveCopy"
          type="checkbox"
          class="ring-0"
          id="useNative"
          v-model="useNative"
        />
        <label for="useNative" class="select-none">Use native copy's URL</label>
      </div>
      <button @click="addImage">Add image</button>
    </div>
  </Popover>
</template>

<style scoped>
div[data-pc-section="box"] {
  @apply hidden;
}
</style>
