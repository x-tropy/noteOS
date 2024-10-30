<template>
  <div class="dropdown-menu">
    <button
      :class="{ 'is-selected': index === selectedIndex }"
      v-for="(item, index) in items"
      :key="index"
      @click="selectItem(index)"
    >
      <img v-if="item.fallbackImage" :src="item.fallbackImage" />
      <template v-else>
        {{ item.emoji }}
      </template>
      :{{ item.name }}:
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Define props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
  editor: {
    type: Object,
    required: true,
  },
});

// Define reactive state
const selectedIndex = ref(0);

// Watch `items` prop and reset `selectedIndex` when items change
watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  },
);

// Define methods
function upHandler() {
  selectedIndex.value =
    (selectedIndex.value + props.items.length - 1) % props.items.length;
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
}

function enterHandler() {
  selectItem(selectedIndex.value);
}

const emit = defineEmits(["keyDown"]);
// Expose onKeyDown to be accessible from the parent component
defineExpose({ onKeyDown });

function onKeyDown({ event }) {
  if (event.key === "ArrowUp") {
    upHandler();
    return true;
  }
  if (event.key === "ArrowDown") {
    downHandler();
    return true;
  }
  if (event.key === "Enter") {
    enterHandler();
    return true;
  }
  return false;
}

function selectItem(index) {
  const item = props.items[index];
  if (item) {
    props.command({ name: item.name });
  }
}
</script>

<style scoped>
/* Dropdown menu */
.dropdown-menu {
  @apply flex flex-col shadow-elevation-md rounded bg-white gap-1 p-1;
  button {
    @apply p-1 flex gap-1 w-full text-left font-mono text-sm;
    &:hover, &:hover.is-selected, &.is-selected {
      @apply bg-gray-200;
    }
    img {
      @apply h-5 w-5;
    }
  }
}
</style>
