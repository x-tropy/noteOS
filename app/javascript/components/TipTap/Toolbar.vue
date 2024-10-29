<script setup>
import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import {
  setLink,
  unsetLink,
  alignCenter,
  alignLeft,
} from "./ToolbarCommands.js";
import {
  IconAlignLeft2,
  IconAlignCenter,
  IconLink,
  IconUnlink,
} from "@tabler/icons-vue";
import Menu from "primevue/menu";
import AddImagePopover from "~/components/TipTap/AddImagePopover.vue";
import AttachFileDialog from "~/components/TipTap/AttachFileDialog.vue";
import SearchItemsDialog from "~/components/TipTap/SearchItemsDialog.vue";

const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Refresh",
      },
      {
        label: "Export",
      },
    ],
  },
]);
const menu = ref();
const toggle = (e) => menu.value.toggle(e);
const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
</script>

<template>
  <div class="control-group">
    <div class="button-group">
      <button @click.prevent="setLink(editor)">
        <IconLink :class="{ 'bg-black': editor.isActive('link') }" />
      </button>
      <button
        @click.prevent="unsetLink(editor)"
        :disabled="!editor.isActive('link')"
        :class="{ 'text-gray-400': !editor.isActive('link') }"
      >
        <IconUnlink />
      </button>
    </div>
    <div class="button-group">
      <button @click.prevent="alignLeft(editor)">
        <IconAlignLeft2
          :class="{ 'bg-black': editor.isActive({ textAlign: 'left' }) }"
        />
      </button>
      <button @click.prevent="alignCenter(editor)">
        <IconAlignCenter
          :class="{ 'bg-black': editor.isActive({ textAlign: 'center' }) }"
        />
      </button>
    </div>
    <div class="button-group">
      <AddImagePopover :editor="editor" />
      <AttachFileDialog :editor="editor" />
      <SearchItemsDialog :editor="editor" />
    </div>
  </div>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
