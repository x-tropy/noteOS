<template>
  <node-view-wrapper>
    <div class="counter-wrapper">
      <label>Vue Component</label>
      <p>
        <button @click.prevent="increase">
          This button has been clicked {{ props.node.attrs.count }} times.
        </button>
      </p>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

const props = defineProps(nodeViewProps);

const increase = () => {
  props.updateAttributes({
    count: props.node.attrs.count + 1,
  });
};

</script>

<style>
.counter-wrapper {
  @apply border-2 border-amber-400 rounded block;
}
</style>
