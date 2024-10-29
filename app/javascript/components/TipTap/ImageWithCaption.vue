<template>
  <node-view-wrapper draggable="true">
    <figure>
      <img :src="props.node.attrs.src" />
      <figcaption
        :class="{ empty: caption.trim() === '' }"
        contenteditable="true"
        @input="updateCaption"
      >
        {{ caption }}
      </figcaption>
    </figure>
  </node-view-wrapper>
</template>

<script setup>
import { ref, watch } from "vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

const props = defineProps(nodeViewProps);
const caption = ref(props.node.attrs.caption);

// Update caption in the node attributes
const updateCaption = (event) => {
  const newCaption = event.target.innerText;
  props.updateAttributes({ caption: newCaption });
};

// Watch for externally triggered changes
watch(
  () => props.node.attrs.caption,
  (newCaption) => {
    caption.value = newCaption;
  },
);
</script>
