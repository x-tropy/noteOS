<script setup>
import Navbar from "./Navbar.vue";
import { ref, computed } from "vue";
import Features from "./Features/Root.vue";
import UserGuide from "./UserGuide.vue";
import Installation from "./Installation.vue";
import About from "./About.vue";

const currentIndex = ref(0);

function updateIndex(i) {
  currentIndex.value = i;
}

const tabItems = [Features,  Installation, UserGuide, About];
const currentItem = computed(() => tabItems[currentIndex.value]);
</script>

<template>
  <Navbar :activeIndex="currentIndex" @update-index="updateIndex" />
  <div class="wrapper">
    <component :is="currentItem" :key="currentIndex" />
  </div>
</template>
