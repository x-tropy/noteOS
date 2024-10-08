<template>
  <node-view-wrapper class="relative">
    <CodeLanguageLabel :language="props.node.attrs.language || 'auto'" />
    <pre><code><node-view-content/></code></pre>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import CodeLanguageLabel from "~/components/CodeLanguageLabel.vue";

const props = defineProps(nodeViewProps);
</script>
