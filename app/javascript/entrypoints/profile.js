import { createApp } from "vue";
import Profile from "../components/Profile/Profile.vue";
import VueTippy from "vue-tippy";
import 'tippy.js/dist/tippy.css'

const app = createApp(Profile);
app.mount("#profile");
app.use(VueTippy, {
  defaultProps: { placement: "top" },
});
