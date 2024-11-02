import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import suggestion from "./emojiSuggestion.js";

const inlineLogos = [
  //   TODO: add more extropy products' logos
  {
    name: "noteOS",
    shortcodes: ["noteos"],
    tags: ["note"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/noteOS.svg",
  },
  {
    name: "extropy",
    shortcodes: ["extropy"],
    tags: ["extropy"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/extropy.svg",
  },{
    name: "dbwizard",
    shortcodes: ["dbwizard"],
    tags: ["dbwizard"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/dbWizard.svg",
  },{
    name: "docroll",
    shortcodes: ["docroll"],
    tags: ["docroll"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/docroll.svg",
  },{
    name: "unistack",
    shortcodes: ["unistack"],
    tags: ["unistack"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/uniStack.svg",
  },{
    name: "rote",
    shortcodes: ["rote"],
    tags: ["rote"],
    group: "extropy products",
    fallbackImage: "https://fly.storage.tigris.dev/vite/images/Rote.svg",
  },
];

export default Emoji.configure({
  emojis: [...gitHubEmojis, ...inlineLogos],
  enableEmoticons: true,
  suggestion,
  HTMLAttributes: {
    class: "inline-image",
  },
});
