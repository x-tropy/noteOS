<script setup>
import draggable from "vuedraggable";
import { ref } from "vue";

const myArray = ref([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Daisy" },
  { id: 5, name: "Ethan" },
]);
</script>

<template>
  <draggable v-model="myArray" item-key="id">
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable>
</template>
