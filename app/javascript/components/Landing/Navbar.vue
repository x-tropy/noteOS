<script setup>
import { onMounted, ref } from "vue";

const starCount = ref(null);

async function fetchStarCount(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      starCount.value = data.stargazers_count;
      saveToLocalStorage(data.stargazers_count);
    } else {
      console.error("Error fetching star count:", data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

function saveToLocalStorage(count) {
  const data = {
    starCount: count,
    timestamp: Date.now(),
  };
  localStorage.setItem("noteosStarCount", JSON.stringify(data));
}

function getFromLocalStorage() {
  const data = localStorage.getItem("noteosStarCount");
  if (data) {
    const parsed = JSON.parse(data);
    const isOld = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000; // 24 hours
    if (!isOld) {
      starCount.value = parsed.starCount;
      return true;
    }
  }
  return false;
}

const menuItems = ["Features", "User Guide", "Installation", "About"];

const props = defineProps({
  activeIndex: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update-index"]);

onMounted(() => {
  if (!getFromLocalStorage()) {
    fetchStarCount("x-tropy", "noteOS");
  }
});
</script>

<template>
  <div class="wrapper navbar">
    <a href="/" target="_self">
      <img
        class="h-6"
        src="https://fly.storage.tigris.dev/vite/images/noteOS.svg"
      />
    </a>
    <ul
      class="navbar-menu flex gap-3 md:gap-4 lg:gap-6 text-sm lg:text-base font-medium lg:font-semibold text-gray-400"
    >
      <li
        class="flex flex-col items-center"
        @click="$emit('update-index', index)"
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ active: index === activeIndex }"
      >
        <span class="leading-8">{{ item }}</span
        ><span class="indicator"></span>
      </li>
    </ul>
    <a
      class="flex items-center gap-1 github"
      href="https://github.com/x-tropy/noteOS"
      target="_blank"
    >
      <span
        class="flex gap-1 items-center tracking-wide font-medium text-sm text-gray-500 rounded-full border border-gray-300 px-2 py-0.5"
      >
        <img
          src="https://fly.storage.tigris.dev/vite/images/star.svg"
          class="h-4"
        />
        {{ starCount !== null ? `${starCount} stars` : "Loading..." }}
      </span>
      <img
        src="https://fly.storage.tigris.dev/vite/images/github.svg"
        class="h-6"
      />
    </a>
  </div>
</template>

<style scoped></style>
