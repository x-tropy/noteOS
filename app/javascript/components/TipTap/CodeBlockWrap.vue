<template>
  <node-view-wrapper class="relative code-block-wrap">
    <span
      class="code-language-label font-mono text-sm flex absolute top-2 left-2 px-1 bg-black text-white rounded"
    >
      {{ props.node.attrs.language || "auto" }}
    </span>
    <!--don't split pre tag and code tag-->
    <pre><code><node-view-content/></code></pre>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
// import {IconCode} from "./preprocess.js";

const props = defineProps(nodeViewProps);
</script>
