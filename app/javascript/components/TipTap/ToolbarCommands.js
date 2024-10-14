export function setLink(editor) {
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
}

export function unsetLink(editor) {
  editor.chain().focus().unsetLink().run()
}
