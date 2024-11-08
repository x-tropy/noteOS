<template>
  <div id="drawboard-toolbar">
    <button @click="addText">Add Text</button>
    <button @click="triggerSave">Save</button>
  </div>
</template>

<script setup>
import {FabricText} from "fabric";
import {defineEmits} from "vue"

const emit = defineEmits(['save']);

const addText = () => {
  const text = new FabricText('Fabric.JS', {
    cornerStyle: 'round',
    cornerStrokeColor: 'blue',
    cornerColor: 'lightblue',
    padding: 10,
    transparentCorners: false,
    cornerDashArray: [2, 2],
    borderColor: 'orange',
    borderDashArray: [3, 1, 3],
    borderScaleFactor: 2,
  });
  props.canvas.add(text);
  props.canvas.centerObject(text);
  props.canvas.setActiveObject(text);
}

const triggerSave = () => {
  emit('save')
}

const props = defineProps({
  canvas: {
    type: Object,
    required: true,
  },
});
</script>
