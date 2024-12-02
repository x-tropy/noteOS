<script setup>
import { computed, ref } from "vue";
import CoverArt from "./CoverArt.json";
import {IconPhotoSpark, IconRefresh} from "@tabler/icons-vue";

function getRandomItem(array, storageKey) {
  // Retrieve displayed items from localStorage
  const displayedItems = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Filter items that haven't been displayed yet
  const availableItems = array.filter((item) => !displayedItems.includes(item));

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
  selectedItem.value = getRandomItem(CoverArt, "cover-art-buwei");
}
const selectedItem = ref(getRandomItem(CoverArt, "cover-art-buwei"));
const isImageVisible = ref(true);
const showMetaInfo = ref(false)
function toggleMetaInfo() {
  showMetaInfo.value = !showMetaInfo.value;
}
const urlPrefix = "https://fly.storage.tigris.dev/ai-art/";
const imgSrc = computed(() =>`${urlPrefix}${selectedItem.value.imgName}.${selectedItem.value.imgFormat}`);
const videoSrc = computed(() =>`${urlPrefix}${selectedItem.value.imgName}.mp4`);
</script>

<template>
  <div
    class="media-container"
    @mouseover="isImageVisible = false"
    @mouseleave="isImageVisible = true"
  >
    <div class="actions">
      <button class="btn refresh" @click="refreshItem"><IconRefresh size="20" class="text-white" /></button>
      <button class="btn showMetaInfo" @click="toggleMetaInfo"><IconPhotoSpark size="20" class="text-white" /></button>
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
    <div v-if="selectedItem.metaInfo" class="media-meta"  :class="{'opacity-0': !showMetaInfo}">
    <p>
      <span class="font-semibold mr-2">{{selectedItem.genre == "AI art" && "Prompt"}}🪄: </span>{{selectedItem.metaInfo}}
    </p>
    </div>
  </div>
</template>

<style scoped>
.media-container {
  @apply w-full h-[315px] rounded-b-xl rounded-bl-xl overflow-hidden;
}
.actions {
  @apply absolute top-4 pr-4 gap-2 w-full flex flex-row-reverse z-10;
  .btn {
    @apply block text-white z-20 p-1 rounded-lg bg-black bg-opacity-20 hover:bg-opacity-100 border border-white ;
  }
}

.media-image,
.media-video {
  @apply object-cover;
}
.media-meta {
  @apply absolute top-0 transition-opacity w-full h-full duration-300 bg-white bg-opacity-65 backdrop-blur-lg;
  p {
    @apply text-black font-serif text-xl mt-10 mx-auto w-2/3 drop-shadow-md shadow-white font-light;
  }
}
</style>
