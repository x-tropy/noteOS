import Link from "@tiptap/extension-link";

export default Link.configure({
    openOnClick: false,
    defaultProtocol: "https",
    autolink: true,
    linkOnPaste: true,
}).extend({
    exitable: true,
})
