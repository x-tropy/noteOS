<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { ref, onMounted, computed } from "vue";

const slogans = [
  ["Organize your projects", "Task", "green"],
  ["Visualize your thinking", "Sketch", "purple"],
  ["Build your knowledge base", "Article", "blue"],
  ["Sparkle your insights", "Canvas", "red"],
  ["Securely store assets", "Attachment", "orange"],
];

const players = slogans.map(
  (slogan) =>
    `https://fly.storage.tigris.dev/vite/noteOS/images/${slogan[1].toLowerCase()}.lottie`,
);

const currentIndex = ref(0);

onMounted(
  () =>
    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % slogans.length;
    }, 4000), // Change every 3 seconds
);

const currentItem = computed(() => slogans[currentIndex.value]);

const nextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % slogans.length;
};

const setItem = (el) => {
  el.style.transitionDelay = "0s"; // Example: adding some delay if needed
};
</script>

<template>

    <div class="slider-slogan">
      <transition name="slide-vertical" @before-enter="setItem" mode="out-in">
        <div
          class="flex flex-col items-center font-bold text-[40px] md:text-[50px] lg:text-[70px] text-center leading-tight"
          v-if="currentItem"
          :key="currentItem"
        >
          <div>{{ currentItem[0] }}</div>
          <div class="flex items-center">
            <div>with</div>
            <DotLottieVue
              class="w-12 md:w-14 lg:w-20 aspect-[5/7] ml-1 lg:ml-2 relative"
              autoplay
              speed="1"
              :src="players[currentIndex]"
            />
            <div :class="`text-decoration-${currentItem[2]}`">
              {{ currentItem[1] }}.
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<style>
.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition:
    transform 0.7s ease,
    opacity 0.7s ease;
}

.slide-vertical-enter-from {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-vertical-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-vertical-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-vertical-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>
