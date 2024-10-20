<template>
  <node-view-wrapper class="relative code-block-wrap"  data-controller="copy-code">
    <span class="code-language-label">
      {{ props.node.attrs.language || "auto" }}
    </span>
    <button class="copy-code-button" data-copy-code-target="button" data-action="click->copy-code#copyToClipboard">Copy</button>
    <!--don't split pre tag and code tag-->
    <pre><code data-copy-code-target="code"><node-view-content/></code></pre>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
// import {IconCode} from "./preprocess.js";

const props = defineProps(nodeViewProps);
</script>
