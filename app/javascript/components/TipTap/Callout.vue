<template>
  <node-view-wrapper :as="tag">
    <div class="callout" :class="`callout-${intent}`">
      <h3 contenteditable="true" @input="updateHeading">{{ heading }}</h3>
      <p contenteditable="true" @input="updateContent">{{ content }}</p>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { ref, watch } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

const props = defineProps(nodeViewProps);

// Define the local state for heading and content
const heading = ref(props.node.attrs.intent || "Default Heading");
const content = ref("Content of callout"); // You can initialize with a default or leave empty

// Watch for changes in the node attributes
watch(
  () => props.node.attrs.intent,
  (newVal) => {
    heading.value = newVal || "Default Heading";
  },
);

// Method to update the heading in the node
function updateHeading(event) {
  heading.value = event.target.innerText;
  props.updateAttributes({ intent: heading.value });
}

// Method to update the content in the node
function updateContent(event) {
  content.value = event.target.innerText;
  props.updateAttributes({ content: content.value });
}
</script>
