<template>
  <div>
    <DrawboardToolbar :canvas="canvas" @save="saveContent" />
    <DrawboardCanvas :canvas="canvas" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DrawboardToolbar from "./Drawboard/DrawboardToolbar.vue";
import DrawboardCanvas from "./Drawboard/DrawboardCanvas.vue";
import { Canvas } from "fabric";

const props = defineProps({
  drawboardId: {
    type: String,
    required: true,
  },
});

const canvas = ref(null);

onMounted(() => {
  canvas.value = new Canvas("drawboard-canvas", {
    width: 500,
    height: 500,
  });
});

const saveContent = async () => {
  const formData = new FormData();
  formData.append("drawboard[content]", JSON.stringify(canvas.value.toJSON()));

  // Saving canvas data to the server
  const response = await fetch(`/drawboards/${props.drawboardId}`, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      Accept: "application/json",
    },
    body: formData,
  });

  const data = await response.json();
  console.log(data);
};
</script>
