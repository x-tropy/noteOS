<script setup>
import { ref, computed } from "vue";
import posts from "./posts.json";

const tabItems = ["About", "Extropy tools", "Blog"];
const activeTabIndex = ref(0);
const filteredPosts = computed(() =>
  posts.filter((post) => post.tab === tabItems[activeTabIndex.value]),
);
</script>

<template>
  <ul class="tabs-container">
    <li
      @click="() => (activeTabIndex = index)"
      class="tab-item"
      :class="{ active: index === activeTabIndex }"
      v-for="(item, index) in tabItems"
      :key="index"
    >
      {{ item }}
    </li>
  </ul>
  <ul class="posts-container">
    <li v-for="(post, index) in filteredPosts" :key="index" class="post">
      <a :href="'/buwei/'+ post.href">
        <img
          :src="
            'https://fly.storage.tigris.dev/vite/noteOS/thumbnails/' +
            post.href +
            '.png'
          "
        />
        <h3 class="text-slate-600 text-lg font-semibold mt-2">
          {{ post.title }}
        </h3>
      </a>
      <span class="text-stone-500 tracking-wide text-xs">{{
        post.editDate ? "Edited at " + post.editDate : "Published at " + post.publishDate
      }}</span>
    </li>
  </ul>
</template>

<style scoped>
.tabs-container {
  @apply flex flex-wrap gap-2 sticky top-0 p-1 rounded-b rounded-bl bg-opacity-30 backdrop-blur-lg bg-white;

  .tab-item {
    @apply text-xs sm:text-sm cursor-pointer rounded sm:rounded-md px-3 py-1.5 sm:px-5 sm:py-2 text-stone-500 hover:bg-stone-300 hover:text-stone-700 transition-colors font-semibold tracking-wide;

    &.active {
      @apply bg-black text-white hover:text-white;
    }
  }
}

.posts-container {
  @apply gap-3 std:grid std:grid-cols-2 my-8;

  .post {
    @apply mb-6 std:mb-3;

    &:hover {
      img {
        @apply shadow-elevation-lg transition-all;
      }
    }

    img {
      @apply aspect-[16/9] shadow-elevation-xs w-full rounded;
    }
  }
}
</style>
