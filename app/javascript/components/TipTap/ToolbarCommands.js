export function setLink(editor) {
  const previousUrl = editor.getAttributes("link").href;
  let url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  // link belongs to me
  const isInternalLink = url.startsWith("/");

  // prefix url with "https://"
  (function prefixWithHttps() {
    if (url.includes("//")) return;
    else if (isInternalLink) url = "/articles" + url;
    else url = "https://" + url;
  })();

  // update link
  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({
      href: url,
      class: isInternalLink ? "internal" : "external",
      target: isInternalLink ? "_self" : "_blank"
    })
    .run();
}

export function unsetLink(editor) {
  editor.chain().focus().unsetLink().run();
}
