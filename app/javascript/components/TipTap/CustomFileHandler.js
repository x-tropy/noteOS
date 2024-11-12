import FileHandler from "@tiptap-pro/extension-file-handler";

export default FileHandler.configure({
  allowedMimeTypes: [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml"
  ],
  onDrop: (editor, files, pos) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = uploadImage(editor, file);
    });
  },
  onPaste: (editor, files) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = uploadImage(editor, file);
    });
  },
});

const uploadImage = async (editor, file) => {
  const formData = new FormData();
  formData.append("attachment[contents]", file);
  formData.append("attachment[name]", "Image from clipboard");

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
    // Insert the image into the Tiptap editor
    editor.chain().focus().setImageWithCaption({ src: data.url }).run();
    editor.commands.setTextSelection({
      from: selection.value.from + 1,
      to: selection.value.to + 1,
    });
  } else {
    console.error("Image upload failed");
  }
};
