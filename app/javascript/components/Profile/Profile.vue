<script setup>
import MediaHover from "@/components/Profile/MediaHover.vue";
import SocialAccounts from "@/components/Profile/SocialAccounts.vue";
</script>

<template>
  <a href="/" class="lg:hidden">
    <img
      src="https://fly.storage.tigris.dev/vite/noteOS/images/icon.svg"
      class="absolute top-4 left-4 h-7 w-7 z-20 inline-block"
    />
  </a>
  <div id="cover-art">
    <MediaHover />
  </div>
  <div id="header">
    <div class="left">
      <div class="name-container">
        <h1 class="name">Buwei Liao</h1>
        <SocialAccounts class="social-accounts" />
      </div>
      <h2>
        <span>💫</span>Reimage Programming<span>🖥️</span>,
        Design<span>🎨</span>, and Human-Computer Interaction<span>🗣️</span> in
        the age of generative AI.
      </h2>
    </div>
    <div id="portrait">
      <img
        src="https://fly.storage.tigris.dev/vite/images/portrait-buwei.jpg"
        class="rounded-full w-full"
      />
    </div>
  </div>
</template>

<style scoped>
#cover-art {
  @apply relative;
}

#header {
  @apply w-full relative grid grid-cols-4;

  #portrait {
    @apply relative -top-10 sm:-top-12 std:-top-14 col-span-1;
  }

  .left {
    @apply col-span-3 ml-4 std:ml-0;

    .name-container {
      @apply mt-4 mb-4 flex sm:justify-between flex-col sm:flex-row;

      .name {
        @apply font-serif text-2xl font-semibold tracking-wider inline-block mt-1;
      }

      .social-accounts {
        @apply mr-0 mb-1 sm:mb-0 xs:mr-4 flex h-6 flex gap-3 mt-2;
      }
    }

    h2 {
      @apply tracking-wide font-medium bg-gradient-to-r from-rose-500 via-fuchsia-500  via-violet-500  via-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent -mr-10 sm:-mr-0;

      span {
        @apply text-black;
      }
    }
  }
}
</style>
