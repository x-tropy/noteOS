<script setup>
const baseUrl = "https://fly.storage.tigris.dev/vite/images/";
</script>

<template>
  <img :src="`${baseUrl}extropy-noteos.svg`" class="mx-auto h-10 mt-20" />
  <div class="article">
    <p>
      <i>noteOS</i> is an open source project affiliated with <i>Extropy Educational Technologies</i>. We
      aim at redefining how individuals and teams manage their ideas, notes, and
      creative processes. Designed with simplicity, security, and collaboration
      at its core, <i>noteOS</i> provides an intuitive platform that helps users
      capture, organize, and bring their ideas to life effortlessly.
    </p>

    <p>With <i>noteOS</i>, we strive to:</p>
    <ul>
      <li>
        Empower Productivity: Streamline workflows by offering a seamless and
        distraction-free environment for brainstorming, note-taking, and project
        planning.
      </li>
      <li>
        Foster Collaboration: Enable teams to work together in real-time,
        sharing insights, feedback, and updates to fuel collective creativity
        and innovation.
      </li>
      <li>
        Prioritize Privacy: Ensure that users' data is secure, private, and
        always under their control, because your ideas deserve the highest level
        of protection.
      </li>
    </ul>
    <p>
      Built for creators, learners, and professionals alike, <i>noteOS</i> is more than
      a tool—it’s a catalyst for turning thoughts into reality. Join us on this
      journey to simplify and enhance the way we think, create, and innovate.
    </p>
  </div>
</template>

<style scoped>
.article {
  @apply mt-10 mb-20;
}
ul li {
  @apply !text-lg;
}
</style>
