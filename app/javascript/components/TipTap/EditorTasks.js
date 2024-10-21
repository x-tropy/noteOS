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

let lastSavedContent = localStorage.getItem('currentContent') || '';

export function periodicTask(editor) {
  const intervalId = setInterval(() => {
    syncContent(editor.value)
  }, 5000)

  return intervalId
}

function syncContent(editor) {
  const currentContent = editor.getHTML()
  if (currentContent !== lastSavedContent) {
    localStorage.setItem('currentContent', currentContent);
    document.getElementById("silent-sync")?.click()
  }
}
