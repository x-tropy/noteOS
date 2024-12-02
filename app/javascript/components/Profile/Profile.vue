<script setup>
import MediaHover from "@/components/Profile/MediaHover.vue";
</script>

<template>
  <div id="cover-art">
    <MediaHover />
  </div>
  <div id="portrait">
    <img
      src="https://fly.storage.tigris.dev/vite/images/portrait-buwei.jpg"
      class="rounded-full w-40"
    />
  </div>
  <div id="header">
    <h1>Buwei Liao</h1>
    <h2><span>💫</span>Reimage Programming<span>🖥️</span>, Design<span>🎨</span>, and Human-Computer Interaction<span>🗣️</span> in the age of generative AI.</h2>

  </div>
</template>

<style scoped>
#cover-art {
  @apply relative;
}
</style>
