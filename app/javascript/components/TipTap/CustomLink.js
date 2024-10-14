import Link from "@tiptap/extension-link";

export default Link.configure({
    openOnClick: true,
    defaultProtocol: "https",
    autolink: true,
    linkOnPaste: true,
}).extend({
    exitable: true,
})
