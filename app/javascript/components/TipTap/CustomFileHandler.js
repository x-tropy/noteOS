import FileHandler from "@tiptap-pro/extension-file-handler";

export default FileHandler.configure({
  allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"],
  onDrop: (currentEditor, files, pos) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      console.log("onDrop", fileReader.result)
      fileReader.onload = () => {
        currentEditor
          .chain()
          .insertContentAt(pos, {
            type: "image",
            attrs: {
              src: fileReader.result,
            },
          })
          .focus()
          .run();
      };
    });
  },
  onPaste: (currentEditor, files) => {
    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        currentEditor
          .chain()
          .insertContentAt(currentEditor.state.selection.anchor, {
            type: "image",
            attrs: {
              src: fileReader.result,
            },
          })
          .focus()
          .run();
      };
    });
  },
});
