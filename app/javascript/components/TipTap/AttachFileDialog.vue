<script setup>
import { IconPaperclip } from "@tabler/icons-vue";
import { Editor } from "@tiptap/vue-3";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
});

// modal
const fileInput = ref();
const visible = ref(false);
const openModal = () => {
  document.body.style.overflow = "hidden";
  visible.value = true;
};
const closeModal = () => {
  document.body.style.overflow = "";
  visible.value = false;
  draggingOver.value = false;
  files.value = [];
};

// dropzone
const files = ref([]);
const draggingOver = ref(false);
const selection = ref({ from: 0, to: 0 });

const handleDragOver = () => {
  draggingOver.value = true;
};
const handleDragLeave = () => {
  draggingOver.value = false;
};
const handleDrop = (e) => {
  files.value = Array.from(e.dataTransfer.files);
};
const formatSize = (size) => {
  return size < 1024
    ? `${size} B`
    : size < 1024 * 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

async function uploadFile() {
  for (const file of files.value) {
    const formData = new FormData();
    formData.append("attachment[contents]", file);
    formData.append("attachment[name]", "File Upload");

    const response = await fetch("/attachments", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        Accept: "application/json",
      },
      body: formData,
    });


    if (response.ok) {
      const data = await response.json();
      if (file.type.split("/")[0] === "image") {
        props.editor
          .chain()
          .focus()
          .setImageWithCaption({ src: data.url })
          .run();
      } else {
        props.editor
          .chain()
          .focus()
          .setAttachment({
            src: data.url,
            title: file.name.split(".")[0],
            type: file.type,
            size: formatSize(file.size)
          })
          .run();
      }
      props.editor.commands.setTextSelection({
        from: props.editor.state.selection.from + 1,
        to: props.editor.state.selection.from + 1,
      });
    } else {
      console.error("File upload failed");
    }
  }
  closeModal();
}

const handleEscKey = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscKey);
});
</script>

<template>
  <button @click.prevent="openModal" class="focus:outline-none">
    <IconPaperclip />
  </button>
  <div v-if="visible" @click.self="closeModal" class="modal-mask">
    <div
      class="rounded-lg bg-white h-[85%] w-[90%] p-4 text-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialogTitle"
    >
      <div
        class="border-4 border-gray-400 h-full flex flex-col items-center gap-2"
        :class="{ 'border-dashed': !draggingOver }"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <h2>Upload files</h2>
        <ul v-if="files.length" class="mt-4 space-y-2">
          <li
            v-for="file in files"
            :key="file.name"
            class="bg-gray-100 p-4 rounded"
          >
            <p><strong>Name:</strong> {{ file.name }}</p>
            <p><strong>Size:</strong> {{ formatSize(file.size) }}</p>
            <p><strong>Type:</strong> {{ file.type }}</p>
          </li>
        </ul>
        <div>
          <button @click.prevent="closeModal">Cancel</button>
          <button @click.prevent="uploadFile">Add file</button>
        </div>
      </div>
    </div>
  </div>
  <input
    ref="fileInput"
    type="file"
    multiple
    name="Upload"
    @change.prevent="uploadFile"
    class="hidden"
  />
</template>
