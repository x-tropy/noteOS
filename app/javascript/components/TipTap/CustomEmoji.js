import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import suggestion from "./emojiSuggestion.js"

const inlineLogos = [
  //   TODO: add more extropy products' logos
  {
    name: 'noteOS',
    shortcodes: ['noteos'],
    tags: ['note'],
    group: 'extropy products',
    fallbackImage: 'https://fly.storage.tigris.dev/vite/images/noteOS.svg',
  },
]

export default Emoji.configure({
  emojis: [...gitHubEmojis, ...inlineLogos],
  enableEmoticons: true,
  suggestion,
});
