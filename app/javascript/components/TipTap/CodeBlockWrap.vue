<template>
  <node-view-wrapper class="code-block-wrap"  data-controller="copy-code">
    <span class="code-language-label">
      {{ props.node.attrs.language || "plaintext" }}
    </span>
    <div class="actions">
    <button class="copy-code-button !top-10" data-copy-code-target="button" data-action="click->copy-code#copyToClipboard">Copy</button>
    </div>
    <pre><code data-copy-code-target="code"><node-view-content/></code></pre>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
const props = defineProps(nodeViewProps);
</script>
