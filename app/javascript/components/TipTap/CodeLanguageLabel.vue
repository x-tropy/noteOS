<script setup>
import { IconCode } from '@tabler/icons-vue';
const props = defineProps({
  language: String,
});
</script>

<template>
  <span class="font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded">
    <IconCode width="20" height="20" class="mr-1" />
    {{ props.language }}
  </span>
</template>
