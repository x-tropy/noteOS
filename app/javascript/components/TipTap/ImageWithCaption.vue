<template>
  <node-view-wrapper draggable="true">
    <ContextMenu ref="menu" :model="items" class="bg-white p-2 shadow-elevation" />
    <figure @contextmenu="onImageRightClick" :class="imgClass">
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
import ContextMenu from "primevue/contextmenu";

const props = defineProps(nodeViewProps);
const caption = ref(props.node.attrs.caption);
const imgClass = ref(props.node.attrs.class);
const menu = ref();
const items = ref([
  {
    label: "20%",
    command: () => {
      props.updateAttributes({ class: "img-20" });
      imgClass.value = "img-20";
    },
  },
  {
    label: "50%",
    command: () => {
      props.updateAttributes({ class: "img-50" });
      imgClass.value = "img-50";
    },
  },
  {
    label: "100%",
    command: () => {
      props.updateAttributes({ class: "img-100" });
      imgClass.value = "img-100";
    },
  },

  {
    label: "original width",
    command: () => {
      props.updateAttributes({ class: "img-original" });
      imgClass.value = "img-original";
    },
  }
]);

// Update caption in the node attributes
const updateCaption = (event) => {
  const newCaption = event.target.innerText;
  props.updateAttributes({ caption: newCaption });
};

const onImageRightClick = (e) => menu.value.show(e);

// Watch for externally triggered changes
watch(
  () => props.node.attrs.caption,
  (newCaption) => {
    caption.value = newCaption;
  },
);
</script>
