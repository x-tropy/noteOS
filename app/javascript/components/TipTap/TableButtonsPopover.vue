<script setup>
import { Editor } from "@tiptap/vue-3";
import { nextTick, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import {
  IconDots,
  IconColumnInsertLeft,
  IconColumnRemove,
  IconRowInsertTop,
  IconRowRemove,
  IconTableMinus,
  IconViewportNarrow,
  IconViewportWide
} from "@tabler/icons-vue";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});
const popover = ref();
const button = ref();
const isPopoverOpen = ref(false);
const popoverPosition = ref({});
const isMounted = ref(false);

const togglePopover = async (event) => {
  isPopoverOpen.value = !isPopoverOpen.value;
  if (isPopoverOpen.value) {
    popoverPosition.value = {
      right:
        document.documentElement.clientWidth -
        event.currentTarget.getBoundingClientRect().right +
        "px",
    };
  }
};

onClickOutside(popover, (e) => {
  if (
    isPopoverOpen.value &&
    !popover.value.contains(e.target) &&
    !button.value.contains(e.target)
  ) {
    isPopoverOpen.value = false;
  }
});

onMounted(async () => {
  await nextTick();
  isMounted.value = true;
});
</script>

<template>
  <button
    ref="button"
    @click.prevent="togglePopover"
    class="focus:outline-none"
    :disabled="!editor.isActive('table')"
  >
    <IconDots />
  </button>
  <Teleport v-if="isMounted" to=".toolbar">
    <div class="inline-block absolute" :style="popoverPosition">
      <div
        class="button-group-2"
        v-show="isPopoverOpen"
        ref="popover"
        :style="popoverPosition"
      >
        <button
          @click.prevent="editor.chain().focus().mergeCells().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconViewportNarrow />
        </button>
        <button
            @click.prevent="editor.chain().focus().splitCell().run()"
            :disabled="!editor.isActive('table')"
        >
          <IconViewportWide />
        </button>
        <button
          @click.prevent="editor.chain().focus().addColumnBefore().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconColumnInsertLeft />
        </button>
        <button
          @click.prevent="editor.chain().focus().addRowBefore().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconRowInsertTop />
        </button>
        <button
          @click.prevent="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconColumnRemove />
        </button>
        <button
          @click.prevent="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconRowRemove />
        </button>
        <button
          @click.prevent="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.isActive('table')"
        >
          <IconTableMinus />
        </button>
      </div>
    </div>
  </Teleport>
</template>
