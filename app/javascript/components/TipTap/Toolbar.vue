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
  IconColumnInsertRight,
  IconRowInsertBottom,
  IconTablePlus,
  IconSquareRoundedPlus,
  IconSquareRoundedMinus2,
  IconBrandYoutube,
} from "@tabler/icons-vue";
import AddImagePopover from "~/components/TipTap/AddImagePopover.vue";
import AttachFileDialog from "~/components/TipTap/AttachFileDialog.vue";
import SearchItemsDialog from "~/components/TipTap/SearchItemsDialog.vue";
import TableButtonsPopover from "~/components/TipTap/TableButtonsPopover.vue";
import { containerWidth } from "~/components/TipTap/EditorTasks.js";

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

const addYoutube = () => {
  const url = prompt("Enter YouTube URL");
  props.editor
    .chain()
    .focus()
    .setYoutubeVideo({
      src: url,
      width: containerWidth(),
      height: containerWidth() / 2,
    })
    .run();
};
</script>

<template>
  <div class="toolbar">
    <div class="control-group">
      <div class="button-group">
        <button @click.prevent="setLink(editor)">
          <IconLink :class="{ 'bg-black': editor.isActive('link') }" />
        </button>
        <button
          @click.prevent="unsetLink(editor)"
          :disabled="!editor.isActive('link')"
        >
          <IconUnlink />
        </button>
      </div>
      <div class="button-group">
        <button
          @click.prevent="alignLeft(editor)"
          :class="{ 'bg-black': editor.isActive({ textAlign: 'left' }) }"
        >
          <IconAlignLeft2 />
        </button>
        <button
          @click.prevent="alignCenter(editor)"
          :class="{ 'bg-black': editor.isActive({ textAlign: 'center' }) }"
        >
          <IconAlignCenter />
        </button>
      </div>
      <div class="button-group">
        <AddImagePopover :editor="editor" />
        <AttachFileDialog :editor="editor" />
        <SearchItemsDialog :editor="editor" />
      </div>
      <div class="button-group">
        <button
          @click="
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          "
        >
          <IconTablePlus />
        </button>
        <button
          @click="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconColumnInsertRight />
        </button>
        <button
          @click="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconRowInsertBottom />
        </button>
        <TableButtonsPopover :editor="editor" />
      </div>
      <div class="button-group">
        <button @click="editor.chain().focus().setDetails().run()">
          <IconSquareRoundedPlus />
        </button>
        <button
          @click="editor.chain().focus().unsetDetails().run()"
          :disabled="!editor.isActive('details')"
        >
          <IconSquareRoundedMinus2 />
        </button>
        <button @click="addYoutube">
          <IconBrandYoutube />
        </button>
      </div>
    </div>
  </div>
</template>
