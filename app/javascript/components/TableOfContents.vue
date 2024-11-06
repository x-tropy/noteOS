<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { IconList } from "@tabler/icons-vue";

const tocItems = ref([]);
let intervalId;
let observer;
let visibleHeadingIds = ref([]);
let activeHeadingId = ref("");
let headingCount = ref(0);
let sortedVisibleHeadingIds = computed(() => {
  return tocItems.value
    .map((item) => item.id)
    .filter((id) => visibleHeadingIds.value.includes(id));
});
let floating = ref(false);

function generateTOC() {
  const headings = document.querySelectorAll(
    "#tiptap-editor .ProseMirror > h2,h3, .article > h2,h3",
  );
  headingCount.value = headings.length;
  if (headings.length < 3) return;

  const updatedTocItems = Array.from(headings).map((heading) => ({
    level: heading.tagName.toLowerCase(),
    id: heading.id,
    text: heading.innerText,
  }));
  if (JSON.stringify(updatedTocItems) === JSON.stringify(tocItems.value))
    return;
  tocItems.value = updatedTocItems;

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
  if (sortedVisibleHeadingIds.value.length > 0)
    activeHeadingId.value = sortedVisibleHeadingIds.value[0];
};

const displayToc = (e) => {
  document.querySelector(".toc-container").style.display = "block";
  e.stopPropagation()
};

const checkTocWidth = () => {
  const tocContainer = document.querySelector(".toc-container");
  if (!tocContainer) return;
  if (tocContainer.offsetWidth < 80) {
    tocContainer.classList.add("floating");
    tocContainer.style.display = "none";
    floating.value = true;
  }
  if (document.documentElement.clientWidth > 80 * 2 + 750) {
    tocContainer.classList.remove("floating");
    tocContainer.style.display = "block";
    floating.value = false;
  }
};

const collapseToc = (e) => {
  if (!floating.value) return;
  // not expanded
  const tocContainer = document.querySelector(".toc-container")
  if (!tocContainer) return
  if (tocContainer.style.display == "none") return

  if (!tocContainer.contains(e.target)) {
    tocContainer.style.display = "none";
    e.stopPropagation()
  }
};

const options = {
  root: null, // viewport
  threshold: 0.5, // 50% visibility
};

observer = new IntersectionObserver(observerCallback, options);

onMounted(() => {
  intervalId = setInterval(generateTOC, 500);
  checkTocWidth();
  window.addEventListener("resize", checkTocWidth);
  window.addEventListener("click", collapseToc);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  observer.disconnect();
  window.removeEventListener("resize", checkTocWidth);
});
</script>

<template>
  <div class="toc-container">
    <div id="toc">
      <div v-if="headingCount >= 3" class="title">
        <span>Table of Contents</span>
      </div>
      <ul v-if="headingCount >= 3">
        <li
          v-for="item in tocItems"
          :key="item.id"
          :class="[{ active: activeHeadingId == item.id }, item.level]"
        >
          <a :href="`#${item.id}`">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div id="expandToc">
    <div class="container" @click="displayToc">
      <IconList />
      <span>TOC</span>
    </div>
  </div>
</template>
