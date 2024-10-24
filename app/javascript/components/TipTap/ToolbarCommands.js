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
      target: isInternalLink ? "_self" : "_blank",
    })
    .run();
}

export function unsetLink(editor) {
  editor.chain().focus().unsetLink().run();
}

export function externalImage(editor) {
  const url = window.prompt("URL");

  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
}

export function scrapeImage(editor) {
  const url = window.prompt("URL")
  fetch("/items/download_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("[name='csrf-token']").content
    },
    body: JSON.stringify({ url }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log("Image saved successfully", data);
        editor.chain().focus().setImage({ src: data.image_url }).run();
      });
    } else {
      console.error("Failed to save image");
    }
  });
}

export function alignLeft(editor) {
  editor.chain().focus().setTextAlign("left").run()
}

export function alignCenter(editor) {
  editor.chain().focus().setTextAlign("center").run()
}
