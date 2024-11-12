import { createApp } from "vue";
import Sketch from "../components/Sketch.vue";

// Get the drawboardId from the data attribute in the HTML
const sketchEle = document.getElementById("sketch")
const sketchId = sketchEle.dataset.sketchId;
const sketchContent = sketchEle.dataset.sketchContent

const app = createApp(Sketch, { sketchId, sketchContent }); // Pass the drawboardId as a prop
app.mount("#sketch");
