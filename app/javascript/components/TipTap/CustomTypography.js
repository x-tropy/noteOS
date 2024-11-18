import { Typography } from "@tiptap/extension-typography";
import { textInputRule } from "@tiptap/core";

// Custom input rule
const downwardArrow = () =>
  textInputRule({
    find: /\|>$/,
    replace: "↓",
  });

const upwardArrow = () =>
  textInputRule({
    find: /<\|$/,
    replace: "↑",
  });

const euroSign = () =>
  textInputRule({
    find: / eur$/,
    replace: " €",
  });

const customEmDash = () =>
  textInputRule({
    find: /(?<!`)--/,
    replace: "—"
  });

// Generator function to create input rules
const generateRuleFromNames = (names, symbol) => {
  // Join names with the alternation operator
  const namesPattern = names.join("|:"); // e.g., "heaven|qm|qian"

  return textInputRule({
    find: new RegExp(`:${namesPattern}$`), // Dynamically create the regex based on the names
    replace: symbol,
  });
};

// List of symbols and their corresponding names
const trigrams = [
  { names: ["heaven", "qm"], symbol: "☰" },
  { names: ["marsh", "dv"], symbol: "☱" },
  { names: ["fire", "li"], symbol: "☲" },
  { names: ["thunder", "vf"], symbol: "☳" },
  { names: ["wind", "xp"], symbol: "☴" },
  { names: ["water", "kj"], symbol: "☵" },
  { names: ["mountain", "gf"], symbol: "☶" },
  { names: ["earth", "kp"], symbol: "☷" },
];

const hexagrams = [
  { names: ["originating", "tmtm"], symbol: "䷀ 乾" },
  { names: ["completing", "didi"], symbol: "䷁ 坤" },
  { names: ["sprouting", "uvlz"], symbol: "䷂ 屯" },
  { names: ["youth", "ujuv"], symbol: "䷃ 蒙" },
  { names: ["waiting", "uvtm"], symbol: "䷄ 需" },
  { names: ["contention", "tmuv"], symbol: "䷅ 訟" },
  { names: ["hosts", "diuv"], symbol: "䷆ 師" },
  { names: ["union", "uvdi"], symbol: "䷇ 比" },
  { names: ["small limits", "fgtm"], symbol: "䷈ 小畜" },
  { names: ["treading", "tmze"], symbol: "䷉ 履" },
  { names: ["arising", "ditm"], symbol: "䷊ 泰" },
  { names: ["declining", "tmdi"], symbol: "䷋ 否" },
  { names: ["people together", "tmho"], symbol: "䷌ 同人" },
  { names: ["great possessions", "hotm"], symbol: "䷍ 大有" },
  { names: ["humility", "diuj"], symbol: "䷎ 謙" },
  { names: ["excitement", "lzdi"], symbol: "䷏ 豫" },
  { names: ["following", "zelz"], symbol: "䷐ 隨" },
  { names: ["restoration", "ujfg"], symbol: "䷑ 蠱" },
  { names: ["pressing forward", "dize"], symbol: "䷒ 臨" },
  { names: ["contemplation", "fgdi"], symbol: "䷓ 觀" },
  { names: ["biting through", "holz"], symbol: "䷔ 噬嗑" },
  { names: ["adornment", "ujho"], symbol: "䷕ 賁" },
  { names: ["collapse", "ujdi"], symbol: "䷖ 剝" },
  { names: ["returning", "dilz"], symbol: "䷗ 復" },
  { names: ["wronged", "tmlz"], symbol: "䷘ 無妄" },
  { names: ["great restraint", "ujtm"], symbol: "䷙ 大畜" },
  { names: ["hunger", "ujlz"], symbol: "䷚ 頤" },
  { names: ["excess", "zefg"], symbol: "䷛ 大過" },
  { names: ["water", "uvuv"], symbol: "䷜ 坎" },
  { names: ["fire", "hoho"], symbol: "䷝ 離" },
  { names: ["intermingling", "zeuj"], symbol: "䷞ 咸" },
  { names: ["perseverance", "lzfg"], symbol: "䷟ 恒" },
  { names: ["retiring", "tmuj"], symbol: "䷠ 遯" },
  { names: ["pushing", "lztm"], symbol: "䷡ 大壯" },
  { names: ["striding", "hodi"], symbol: "䷢ 晉" },
  { names: ["dark times", "diho"], symbol: "䷣ 明夷" },
  { names: ["family", "fgho"], symbol: "䷤ 家人" },
  { names: ["alienation", "hoze"], symbol: "䷥ 睽" },
  { names: ["constricted", "uvuj"], symbol: "䷦ 蹇" },
  { names: ["released", "lzuv"], symbol: "䷧ 解" },
  { names: ["increase", "ujze"], symbol: "䷨ 損" },
  { names: ["decrease", "fglz"], symbol: "䷩ 益" },
  { names: ["judged", "zetm"], symbol: "䷪ 夬" },
  { names: ["encounter", "tmfg"], symbol: "䷫ 姤" },
  { names: ["congregating", "zedi"], symbol: "䷬ 萃" },
  { names: ["ascending", "difg"], symbol: "䷭ 升" },
  { names: ["oppression", "zeuv"], symbol: "䷮ 困" },
  { names: ["wellspring", "uvfg"], symbol: "䷯ 井" },
  { names: ["revolution", "zeho"], symbol: "䷰ 革" },
  { names: ["cauldron", "hofg"], symbol: "䷱ 鼎" },
  { names: ["quaking", "lzlz"], symbol: "䷲ 震" },
  { names: ["stillness", "ujuj"], symbol: "䷳ 艮" },
  { names: ["graduation", "ujfg"], symbol: "䷴ 漸" },
  { names: ["rejection", "lzze"], symbol: "䷵ 歸妹" },
  { names: ["establishment", "lzho"], symbol: "䷶ 豐" },
  { names: ["wandering", "houj"], symbol: "䷷ 旅" },
  { names: ["penetrating", "fgfg"], symbol: "䷸ 巽" },
  { names: ["joyous", "zeze"], symbol: "䷹ 兌" },
  { names: ["dissolution", "fguv"], symbol: "䷺ 渙" },
  { names: ["discipline", "uvze"], symbol: "䷻ 節" },
  { names: ["contemplation", "fgze"], symbol: "䷼ 中孚" },
  { names: ["small exceeds", "lzuj"], symbol: "䷽ 小過" },
  { names: ["completion", "uvho"], symbol: "䷾ 既濟" },
  { names: ["continuation", "houv"], symbol: "䷿ 未濟" },
];

// Generate all input rules
const trigramRules = trigrams.map(({ names, symbol }) =>
  generateRuleFromNames(names, symbol),
);

const hexagramRules = hexagrams.map(({ names, symbol }) =>
  generateRuleFromNames(names, symbol),
);

const CustomTypography = Typography.extend({
  addInputRules() {
    const rules = this.parent?.(); // Get the original rules

    // Add the custom rule
    rules.push(downwardArrow(), upwardArrow(), euroSign(), customEmDash());
    rules.push(...trigramRules);
    rules.push(...hexagramRules);

    return rules;
  },
}).configure({
  emDash: false,
  // openDoubleQuote: false,
  // closeDoubleQuote: false,
  // openSingleQuote: false,
  // closeSingleQuote: false,
});

export default CustomTypography;
