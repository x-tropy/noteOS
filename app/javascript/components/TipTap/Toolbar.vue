<script setup>
import { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import {
  setLink,
  unsetLink,
  alignCenter,
  alignLeft,
  alignRight,
  handleSubmit,
} from "./ToolbarCommands.js";
import {
  IconAlignLeft2,
  IconAlignCenter,
  IconAlignRight2,
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
  IconCircleDashedCheck,
  IconCircleDashed,
  IconCircleCheckFilled,
  IconCloudExclamation,
  IconList,
  IconListNumbers,
  IconListCheck,
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
  const headerMenu = document.getElementById("quit-editor");
  headerMenu?.click();
};

const setDetails = () => {
  props.editor.chain().focus().setDetails({ content: " " }).run();
  props.editor.chain().focus().insertContent(" ").run();
  const { state } = props.editor;
  const { selection } = state;
  // To fix bug caused by Chinese Input Method
  props.editor.commands.setTextSelection({
    from: selection.from - 1,
    to: selection.to - 1,
  });
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
const saveButton = ref();
const submitArticle = async () => {
  saveButton.value.disabled = true;
  const formElement = document.getElementById("article-form");
  saveStatus.value = "Saving";
  const { success, message } = await handleSubmit(formElement);
  if (success) {
    setTimeout(() => {
      saveStatus.value = "Saved";
      saveButton.value.disabled = false;
    }, 1000);
    // keep the green Saved status, if there isn't new changes happen within editor
    const liveContent = props.editor.value.getHTML().trim();
    const lastSavedArticleContent = localStorage.getItem("lastSavedArticleContent")
    if (liveContent == lastSavedArticleContent) return
    setTimeout(() => {
      saveStatus.value = "Save";
    }, 2000);
  } else {
    setTimeout(() => {
      saveStatus.value = "Failed";
      saveButton.value.disabled = false;
    }, 1000);
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
          @click.prevent="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
        >
          <IconArrowBackUp />
        </button>
        <button
          @click.prevent="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
        >
          <IconArrowForwardUp />
        </button>
      </div>

      <div class="button-group">
        <button
          @click.prevent="setLink(editor)"
          :class="{ active: editor.isActive('link') }"
        >
          <IconLink />
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
          :class="{ active: editor.isActive({ textAlign: 'left' }) }"
        >
          <IconAlignLeft2 />
        </button>
        <button
          @click.prevent="alignCenter(editor)"
          :class="{ active: editor.isActive({ textAlign: 'center' }) }"
        >
          <IconAlignCenter />
        </button>
        <button
          @click.prevent="alignRight(editor)"
          :class="{ active: editor.isActive({ textAlign: 'right' }) }"
        >
          <IconAlignRight2 />
        </button>
      </div>
      <div class="button-group">
        <button
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
          :class="{ active: editor.isActive('bulletList') }"
        >
          <IconList />
        </button>
        <button
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
          :class="{ active: editor.isActive('orderedList') }"
        >
          <IconListNumbers />
        </button>
        <button
          @click.prevent="editor.chain().focus().toggleTaskList().run()"
          :class="{ active: editor.isActive('taskList') }"
        >
          <IconListCheck />
        </button>
      </div>
      <div class="button-group">
        <AddImagePopover :editor="editor" />
        <button @click.prevent="addYoutube">
          <IconBrandBilibili />
        </button>
        <AttachFileDialog :editor="editor" />
        <SearchItemsDialog :editor="editor" />
      </div>
      <!-- Table Menu -->
      <div class="button-group">
        <button
          @click.prevent="
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
          @click.prevent="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconColumnInsertRight />
        </button>
        <button
          @click.prevent="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconRowInsertBottom />
        </button>
        <TableButtonsPopover :editor="editor" />
      </div>
      <div class="button-group">
        <button
          @click.prevent="setDetails"
          :class="{ active: editor.isActive('details') }"
        >
          <IconSquareRoundedPlus />
        </button>
        <button
          @click.prevent="editor.chain().focus().unsetDetails().run()"
          :disabled="!editor.isActive('details')"
        >
          <IconSquareRoundedMinus2 />
        </button>
        <button @click.prevent="editor.chain().focus().addFootnote().run()">
          <IconBracketsContain />
        </button>
      </div>
    </div>
    <div class="fixed-buttons">
      <button @click.prevent="submitArticle" ref="saveButton" id="silent-sync">
        <IconCircleDashedCheck v-if="saveStatus === 'Save'" />
        <IconCircleDashed v-else-if="saveStatus === 'Saving'" class="spin" />
        <IconCloudExclamation v-else-if="saveStatus === 'Failed'" />
        <IconCircleCheckFilled class="text-green-500" v-else />
        <span>{{ saveStatus }}</span>
      </button>
      <button @click.prevent="quitEditor">
        <IconPower />
        <span>Quit</span>
      </button>
    </div>
  </div>
</template>
