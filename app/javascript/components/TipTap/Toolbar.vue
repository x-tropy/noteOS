<script setup>
import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import {
  setLink,
  unsetLink,
  alignCenter,
  alignLeft,
  handleSubmit,
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
  IconBrandBilibili,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBracketsContain,
  IconDeviceFloppy,
  IconPower,
  IconCircleCheckFilled,
  IconRefresh,
  IconCloudExclamation
} from "@tabler/icons-vue";
import AddImagePopover from "~/components/TipTap/AddImagePopover.vue";
import AttachFileDialog from "~/components/TipTap/AttachFileDialog.vue";
import SearchItemsDialog from "~/components/TipTap/SearchItemsDialog.vue";
import TableButtonsPopover from "~/components/TipTap/TableButtonsPopover.vue";
import { containerWidth } from "~/components/TipTap/EditorTasks.js";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

const quitEditor = () => {
  const currentUrl = window.location.href;
  const newUrl = currentUrl.replace("/edit", "");
  window.location.href = newUrl;
};

const addYoutube = () => {
  const url = prompt("Enter YouTube URL");
  if (!url) return;
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

const saveStatus = ref("Save");
const saveButton = ref()
const submitArticle = async () => {
  saveButton.value.disabled = true
  const formElement = document.getElementById("article-form");
  saveStatus.value = "Saving";
  const { success, message } = await handleSubmit(formElement);
  if (success) {
    setTimeout(()=>{
      saveStatus.value = "Saved";
      saveButton.value.disabled = false
    }, 1000)
    setTimeout(() => {
      saveStatus.value = "Save";
    }, 2000);
  } else {
    setTimeout(()=>{
      saveStatus.value = "Failed";
      saveButton.value.disabled = false
    }, 1000)
    setTimeout(() => {
      saveStatus.value = "Save";
    }, 5000);
  }
};
</script>

<template>
  <div class="toolbar">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
        >
          <IconArrowBackUp />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
        >
          <IconArrowForwardUp />
        </button>
      </div>

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
        <button @click="addYoutube">
          <IconBrandBilibili />
        </button>
        <AttachFileDialog :editor="editor" />
        <SearchItemsDialog :editor="editor" />
      </div>
      <!-- Table Menu -->
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
      </div>
    </div>
    <div class="fixed-buttons">
      <button @click.prevent="submitArticle" ref="saveButton" id="silent-sync">
        <IconDeviceFloppy v-if="saveStatus === 'Save'" />
        <IconRefresh v-else-if="saveStatus === 'Saving'" class="spin" />
        <IconCloudExclamation v-else-if="saveStatus === 'Failed'" />
        <IconCircleCheckFilled v-else />
        <span>{{ saveStatus }}</span>
      </button>
      <button @click.prevent="quitEditor">
        <IconPower />
        <span>Quit</span>
      </button>
    </div>
  </div>
</template>
