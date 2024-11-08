import { createApp } from "vue";
import Drawboard from "../components/Drawboard.vue";

// Get the drawboardId from the data attribute in the HTML
const drawboardId = document.getElementById("drawboard").dataset.drawboardId;

const app = createApp(Drawboard, { drawboardId }); // Pass the drawboardId as a prop
app.mount("#drawboard");
