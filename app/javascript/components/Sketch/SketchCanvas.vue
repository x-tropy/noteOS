<template>
  <canvas
    id="sketch-canvas"
    ref="canvasRef"
    class="border border-light"
  ></canvas>
</template>

<script setup>
const props = defineProps({
  canvas: {
    type: Object,
    required: true,
  },
});
</script>
