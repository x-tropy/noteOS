<script setup>
import { ref } from "vue";

const tabNames = ["Article", "Attachment", "Sketch", "Canvas", "Task"];
const currentIndex = ref(0);
const updateIndex = (i) => (currentIndex.value = i);
const baseUrl = "https://fly.storage.tigris.dev/vite/noteOS/images/landing/"
</script>

<template>

  <div class="flex mt-10 border-2 border-gray-200 rounded-lg">
    <div class="flex flex-col items-center relative  bg-gray-100">
      <ul class="tab">
        <li
          class="tab-select"
          :class="{ active: currentIndex === index }"
          v-for="(item, index) in tabNames"
          @click="updateIndex(index)"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <div class="flex-1"></div>
    </div>

    <div class="mt-2">
      <img :src="`${baseUrl}note-type-${tabNames[currentIndex].toLowerCase()}.png`" />
    </div>
  </div>
</template>

<style scoped>
.tab {
  @apply flex flex-col cursor-pointer m-2 gap-2 sticky top-20;

  .tab-select {
    @apply px-3 py-1 rounded hover:bg-white hover:text-gray-500 font-semibold text-gray-400 transition-all;

    &.active {
      @apply bg-gray-600 text-white;
    }
  }
}
</style>
