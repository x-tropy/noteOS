<template>
  <div>
    <SketchToolbar :canvas="canvas" @save="saveContent" />
    <SketchCanvas :canvas="canvas" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SketchToolbar from "././Sketch/SketchToolbar.vue";
import SketchCanvas from "././Sketch/SketchCanvas.vue";
import { Canvas } from "fabric";

const props = defineProps({
  sketchId: {
    type: String,
    required: true,
  },
  sketchContent: {
    type: String,
    required: true,
  },
});

const canvas = ref(null);

onMounted(async () => {
  canvas.value = new Canvas("sketch-canvas", {
    width: 500,
    height: 500,
  });

  if (props.sketchContent) {
    try {
      const parsedContent = JSON.parse(props.sketchContent);
      await canvas.value.loadFromJSON(parsedContent);
      canvas.value.renderAll(); // Ensure rendering after loading
    } catch (error) {
      console.error("Failed to parse sketch content:", error);
    }
  }
});

const saveContent = async () => {
  const formData = new FormData();
  formData.append("sketch[content]", JSON.stringify(canvas.value.toJSON()));

  // Saving canvas data to the server
  const response = await fetch(`/sketches/${props.sketchId}`, {
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
