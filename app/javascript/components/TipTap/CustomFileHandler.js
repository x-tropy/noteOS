import FileHandler from "@tiptap-pro/extension-file-handler";

export default FileHandler.configure({
  allowedMimeTypes: [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  onDrop: (currentEditor, files, pos) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = uploadImage(currentEditor, file);
    });
  },
  onPaste: (currentEditor, files) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = uploadImage(currentEditor, file);
    });
  },
});

const uploadImage = (currentEditor, file) => {
  const formData = new FormData();
  formData.append("image", file); // Append the file blob from clipboard
  formData.append("name", "Clipboard Image"); // Optionally append a name or any other data

  // Send the image to the server
  fetch("/items/upload_clipboard_image", {
    method: "POST",
    headers: {
      "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        currentEditor
          .chain()
          .insertContentAt(currentEditor.state.selection.anchor, {
            type: "image",
            attrs: {
              src: data.image_url, // Use the image URL returned by the backend
            },
          })
          .focus()
          .run();
      } else {
        console.error("Failed to save image", data.error);
      }
    })
    .catch((error) => console.error("Error:", error));
};
