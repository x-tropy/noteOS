<script setup>
import Navbar from "./Navbar.vue";
import Features from "./Features.vue";
import Installation from "./Installation.vue";
import UserGuide from "./UserGuide.vue";
import About from "./About.vue";

import { ref, computed } from "vue";

const activeNavbarIndex = ref(0);
const prevNavbarIndex = ref(0);
const transitionName = computed(() => {
  return activeNavbarIndex.value > prevNavbarIndex.value
      ? "slide-right"
      : "slide-left";
});

function setActiveNavbarIndex(i) {
  prevNavbarIndex.value = activeNavbarIndex.value
  activeNavbarIndex.value = i;
}

const tabItems = [Features, UserGuide, Installation, About];
const activeTabItem = computed(() => tabItems[activeNavbarIndex.value]);
</script>

<template>
  <Navbar
    :activeIndex="activeNavbarIndex"
    @update-index="setActiveNavbarIndex"
  />
  <transition :name="transitionName" mode="out-in">
    <component :is="activeTabItem" :key="activeNavbarIndex"  />
  </transition>
</template>

<style>

/* Fade and move to the left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* Fade and move to the right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
