<script setup>
import { computed, ref } from "vue";
import CoverArt from "./CoverArt.json";
import { IconPhotoAi, IconReload, IconX } from "@tabler/icons-vue";
import { Tippy } from "vue-tippy";

function getRandomItem(array, storageKey) {
  // Retrieve displayed items from localStorage
  const displayedItems = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Filter items that haven't been displayed yet
  const availableItems = array.filter((item) => !displayedItems.some(displayedItem => displayedItem.imgName === item.imgName));

  if (availableItems.length === 0) {
    // Reset displayed items if all have been used
    localStorage.removeItem(storageKey);
    return getRandomItem(array, storageKey);
  }

  // Pick a random item
  const randomIndex = Math.floor(Math.random() * availableItems.length);
  const selectedItem = availableItems[randomIndex];

  // Update the displayed items
  displayedItems.push(selectedItem);

  // Save back to localStorage
  localStorage.setItem(storageKey, JSON.stringify(displayedItems));

  return selectedItem;
}

function refreshItem() {
  if (Array.from(refreshBtn.value.classList).includes("spin")) {
    return;
  }
  refreshBtn.value.classList.add("spin");
  setTimeout(() => {
    refreshBtn.value.classList.remove("spin");
  }, 1000);
  selectedItem.value = getRandomItem(CoverArt, "cover-art-buwei");
  if (showMetaInfo) showMetaInfo.value = !showMetaInfo;
}

const selectedItem = ref(getRandomItem(CoverArt, "cover-art-buwei"));
const isImageVisible = ref(true);
const showMetaInfo = ref(false);
const refreshBtn = ref(null);

function toggleMetaInfo() {
  showMetaInfo.value = !showMetaInfo.value;
}

const urlPrefix = "https://fly.storage.tigris.dev/ai-art/";
const imgSrc = computed(
  () =>
    `${urlPrefix}${selectedItem.value.imgName}.${selectedItem.value.imgFormat}`,
);
const videoSrc = computed(
  () => `${urlPrefix}${selectedItem.value.imgName}.mp4`,
);
</script>

<template>
  <div
    class="media-container"
    @mouseover="isImageVisible = false"
    @mouseleave="isImageVisible = true"
    @touchstart="isImageVisible = false"
    @touchend="isImageVisible = true"
    @contextmenu="e => e.preventDefault()"
  >
    <div class="actions">
      <tippy content="next cover">
      <button class="btn refresh" @click="refreshItem">
        <IconReload ref="refreshBtn" size="20" class="text-white" />
      </button>
      </tippy>
      <tippy :content="showMetaInfo ? 'close' : 'about this AI art'">
      <button class="btn showMetaInfo" @click="toggleMetaInfo">
        <IconPhotoAi v-if="!showMetaInfo" size="20" class="text-white" />
        <IconX v-else size="20" class="text-white" />
      </button>
      </tippy>
    </div>
    <img
      v-if="isImageVisible"
      :src="imgSrc"
      :alt="selectedItem.imgName"
      class="media-image"
    />
    <video
      v-if="selectedItem.hasVideo"
      :src="videoSrc"
      preload="auto"
      autoplay
      muted
      loop
      playsinline
      class="media-video"
      :class="{ hidden: isImageVisible }"
    />
    <div
      v-if="selectedItem.metaInfo"
      class="media-meta"
      :class="{ 'opacity-0': !showMetaInfo }"
    >
      <p class="drop-shadow-text">
        <span class="font-semibold mr-2"
          >{{ selectedItem.genre == "AI art" && "Prompt" }}🪄: </span
        >{{ selectedItem.metaInfo }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.media-container {
  @apply w-full aspect-[21/9] std:rounded-b-xl std:rounded-bl-xl overflow-clip;
}

.actions {
  @apply absolute top-4 pr-4 gap-4 w-full flex flex-row-reverse z-10;

  .btn {
    @apply block z-20 p-1 rounded-lg bg-black bg-opacity-40 shadow-elevation-md hover:bg-opacity-100 border-2 border-white;
  }
}

.media-image,
.media-video {
  @apply w-full h-full object-cover;
}

.media-meta {
  @apply absolute top-0 transition-opacity w-full h-full rounded-b-xl rounded-bl-xl duration-300 bg-white bg-opacity-50 backdrop-blur-lg overflow-scroll;

  p {
    @apply text-black font-serif text-base std:text-lg mt-14 mx-4 std:mx-auto std:w-2/3 font-light;
  }
}
</style>
