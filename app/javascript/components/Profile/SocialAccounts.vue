<script setup>
import {
  IconMapPin,
  IconSchool,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-vue";

import { Tippy } from "vue-tippy";

const items = [
  {
    icon: IconMapPin,
    altText: "Karlsruhe, Germany",
    href: "https://en.wikipedia.org/wiki/Karlsruhe",
  },
  {
    icon: IconMail,
    altText: "buweiliao@gmail.com",
    href: "mailto://buweiliao@gmail.com",
  },
  {
    icon: IconSchool,
    altText: "LogLock (Master Thesis)",
    href: "https://loglock.pages.dev/",
  },
  {
    icon: IconBrandGithub,
    altText: "GitHub",
    href: "https://github.com/x-tropy",
  },
  {
    icon: IconBrandX,
    altText: "X (twitter)",
    href: "https://x.com/extropy_tools",
  },
  {
    icon: IconBrandLinkedin,
    altText: "LinkedIn",
    href: "https://linkedin.com/in/buwei",
  },
];
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <tippy :content="item.altText">
        <a :href="item.href" target="_blank">
          <component
            :is="item.icon"
            class="text-gray-400 hover:text-black transition-all"
            size="24"
            stroke="1.5"
          />
        </a>
      </tippy>
    </li>
  </ul>
</template>

<style scoped>
li {
  a {
    @apply h-6 w-6;
  }
}
</style>
