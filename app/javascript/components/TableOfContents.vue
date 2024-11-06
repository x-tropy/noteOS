<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const tocItems = ref([]);
let intervalId;
let observer;
let visibleHeadingIds = ref([]);
let activeHeadingId = ref("");
let headingCount = ref(0)
let sortedHeadingIds = computed(() => {
  return tocItems.value
    .map((item) => item.id)
    .filter((id) => visibleHeadingIds.value.includes(id));
});

function generateTOC() {
  const headings = document.querySelectorAll(
    "#tiptap-editor .ProseMirror > h2,h3, .article > h2,h3",
  );
  headingCount.value = headings.length
  if (headings.length < 3) return

  tocItems.value = Array.from(headings).map((heading) => ({
    level: heading.tagName.toLowerCase(),
    id: heading.id,
    text: heading.innerText,
  }));

  observer.disconnect();
  headings.forEach((h) => observer.observe(h));
}

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      visibleHeadingIds.value.push(entry.target.id);
    } else {
      visibleHeadingIds.value = visibleHeadingIds.value.filter(
        (id) => entry.target.id !== id,
      );
    }
  });
  if (sortedHeadingIds.value.length > 0)
    activeHeadingId.value = sortedHeadingIds.value[0];
};

const options = {
  root: null, // viewport
  threshold: 0.5, // 50% visibility
};

observer = new IntersectionObserver(observerCallback, options);

onMounted(() => {
  intervalId = setInterval(generateTOC, 500);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  observer.disconnect();
});
</script>

<template >
  <div v-if="headingCount >= 3" class="title">Table of Contents</div>
  <ul  v-if="headingCount >= 3">
    <li
      v-for="item in tocItems"
      :key="item.id"
      :class="[{ active: activeHeadingId == item.id }, item.level]"
    >
      <a :href="`#${item.id}`">{{ item.text }}</a>
    </li>
  </ul>
</template>
