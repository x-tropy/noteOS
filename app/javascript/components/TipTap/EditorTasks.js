// Feature: Ample space

export function ensureThreeEmptyParagraphs(editor, isUpdating) {
  const content = editor.getHTML();

  // Check if the content ends with exactly 3 empty <p> tags
  if (!content.endsWith("<p></p><p></p><p></p>")) {
    isUpdating.value = true; // Prevent triggering onUpdate again
    const selection = saveSelection(editor);
    const updatedContent = content.replace(/(<p><\/p>)+$/, ""); // Remove trailing empty <p> tags
    editor.commands.setContent(`${updatedContent}<p></p><p></p><p></p>`, false); // Add 3 empty <p> tags at the end
    restoreSelection(editor, selection);
    isUpdating.value = false;
  }
}

function saveSelection(editor) {
  const selection = editor.state.selection;
  return { from: selection.from, to: selection.to };
}

function restoreSelection(editor, selection) {
  editor.commands.setTextSelection({ from: selection.from, to: selection.to });
}

// Feature: Silent Sync

export function periodicTask(editor) {
  const intervalId = setInterval(() => {
    syncContent(editor);
    resizeYoutubeFrame()
  }, 3000);

  return intervalId;
}

function syncContent(editor) {
  const liveContent = editor.value.getHTML().trim();

  // Retrieve the latest lastSavedContent each time syncContent is called
  const lastSavedContent = localStorage.getItem("lastSavedContent") || "";

  // Compare liveContent with the most recently saved content
  if (liveContent === lastSavedContent) return;

  document.getElementById("silent-sync")?.click();
  localStorage.setItem("lastSavedContent", liveContent);
}

function resizeYoutubeFrame() {
  const innerWidth = containerWidth()
  const youtubeFrames = document.querySelectorAll(".youtube")
  Array.from(youtubeFrames).forEach(frame => {
    frame.width = innerWidth
    frame.height = innerWidth / 2
  })
}

export function containerWidth() {
  const container = document.querySelector(".article") || document.querySelector("#tiptap-editor .ProseMirror")
  const computedStyle = window.getComputedStyle(container);
  const innerWidth =
      container.offsetWidth -
      parseFloat(computedStyle.paddingLeft) -
      parseFloat(computedStyle.paddingRight);
  return innerWidth
}
