import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { createLowlight } from "lowlight";
import CodeBlockWrapper from "./CodeBlockWrapper.vue";
import hljsVue from "./hljsVue.js";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import ruby from "highlight.js/lib/languages/ruby";
import json from "highlight.js/lib/languages/json";
import erb from "highlight.js/lib/languages/erb";
import markdown from "highlight.js/lib/languages/markdown";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";

const lowlight = createLowlight();
lowlight.register("vue", hljsVue);
lowlight.register({ xml });
lowlight.register({ javascript });
lowlight.register({ css });
lowlight.register({ ruby });
lowlight.register({ json });
lowlight.register({ erb });
lowlight.register({ markdown });
lowlight.register({ sql });
lowlight.register({ bash });
lowlight.register({ typescript });

const CustomCodeBlock = CodeBlockLowlight.configure({ lowlight }).extend({
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockWrapper);
  },
});

export default CustomCodeBlock;
