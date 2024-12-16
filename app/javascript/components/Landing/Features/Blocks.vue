<script setup>
const sections = [
  {
    icon: "edit-note",
    image: "feature-block-1",
    color: "red",
    title: "Great Editing Experience",
    subtitle: [
      "icon-battery",
      "Get supercharged,",
      "icon-open-ai",
      "with your favorite AI model.",
    ],
  },
  {
    icon: "interview",
    image: "feature-block-2",
    color: "blue",
    title: "Collaboration is Simple",
    subtitle: [
      "icon-users-wm",
      "Project members,",
      "icon-screen-sharing",
      "work together with ease.",
    ],
  },
  {
    icon: "book-open",
    image: "feature-block-3",
    color: "green",
    title: "Publish Your Writings",
    subtitle: [
      "icon-send",
      "Get your thoughts out there, ",
      "icon-lightning",
      "instantly.",
    ],
  },
  {
    icon: "circle-user-sparkle-2",
    image: "feature-block-4",
    color: "purple",
    title: "Public profile Made Easy",
    subtitle: [
      "icon-sparks",
      "Polished profile templates,",
      "icon-palette",
      "tailored for you.",
    ],
  },
  {
    icon: "side-profile-gear-1",
    image: "feature-block-5",
    color: "orange",
    title: "Simple and Intuitive",
    subtitle: [
      "icon-folder",
      "A folder system, ",
      "icon-cursor-add",
      "just like the one you use everyday.",
    ],
  },
  {
    icon: "cloud-mining",
    image: "feature-block-6",
    color: "black",
    title: "Access Anywhere",
    subtitle: [
      "icon-explore",
      "Visit your notes securely,",
      "icon-mirror-tablet-phone",
      "on any phone, tablet, or laptop.",
    ],
  },
];
const baseUrl = "https://fly.storage.tigris.dev/vite/noteOS/images/landing/"
</script>

<template>
  <div class="flex flex-col items-center gap-20 my-20">
    <div
      class="flex flex-col items-center"
      v-for="(section, index) in sections"
    >
      <div
        class="w-[70px] aspect-[1/1] mb-4 rounded-full flex items-center justify-center"
        :class="`bg-decoration-${section.color}`"
      >
        <div class="p-2 rounded-xl bg-white bg-opacity-35 shadow-lg">
          <img
            class="w-6 aspect-[1/1] drop-shadow-lg"
            :src="`${baseUrl}${section.icon}.svg`"
          />
        </div>
      </div>
      <h2>{{ section.title }}</h2>
      <h3 class="tracking-wide flex items-center">
        <span v-for="(fragment, index) in section.subtitle">
          <template v-if="fragment.includes('icon')">
            <img
                class="ml-2 mr-1 mt-0.5"
              :src="`${baseUrl}${fragment.slice(5)}.svg`"
            />
          </template>
          <template v-else>
            {{ fragment }}
          </template>
        </span>
      </h3>
      <img class="w-[900px] border-2 border-gray-300 rounded-lg mt-8" :src="`${baseUrl}feature-block-${index+1}.png`" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  @apply font-bold text-[34px];
}

h3 {
  @apply font-medium text-[21px];
}
</style>
