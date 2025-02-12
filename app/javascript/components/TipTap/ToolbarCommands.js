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
  const isInternalLink = url.startsWith("/") || url.includes("noteos.org");

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

export function externalImage(editor, url) {
  if (url) {
    editor
      .chain()
      .focus()
      .setImageWithCaption({ src: url, caption: "example caption" })
      .run();
  }
}

export function scrapeImage(editor, url, useNative) {
  fetch("/attachments/download_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
    },
    body: JSON.stringify({ url }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log("Image saved successfully", data);
        editor
          .chain()
          .focus()
          .setImageWithCaption({
            src: useNative ? data.image_url : url,
          })
          .run();
      });
    } else {
      console.error("Failed to save image");
    }
  });
}

export function alignLeft(editor) {
  editor.chain().focus().setTextAlign("left").run();
}

export function alignCenter(editor) {
  editor.chain().focus().setTextAlign("center").run();
}

export function alignRight(editor) {
  editor.chain().focus().setTextAlign("right").run();
}

export async function handleSubmit(formElement) {
  if (!formElement) return {success: false, message: "lack form element"};
  const formData = new FormData(formElement);
  try {
    const response = await fetch(formElement.action, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        Accept: "application/json",
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return { success: false, message: 'failed to post' };
  }
}
