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
    replace: "—",
    handler: (state, match, start, end) => {
      const { $from } = state.selection;

      // Check if the parent node is a code block
      const parent = $from.node($from.depth);
      if (parent.type.name === "code") {
        // If it's a code node, do nothing
        return null;
      }

      const tr = state.tr.replaceWith(start, end, schema.text("—"));
      return tr;
    },
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
  { names: ["originating", "tm"], symbol: "䷀ 乾" },
  { names: ["completing", "di"], symbol: "䷁ 坤" },
  { names: ["sprouting", "tp"], symbol: "䷂ 屯" },
  { names: ["youth", "mg"], symbol: "䷃ 蒙" },
  { names: ["waiting", "xu"], symbol: "䷄ 需" },
  { names: ["contention", "ss"], symbol: "䷅ 訟" },
  { names: ["hosts", "2ui"], symbol: "䷆ 師" },
  { names: ["union", "bi"], symbol: "䷇ 比" },
  { names: ["small limits", "xcxu"], symbol: "䷈ 小畜" },
  { names: ["treading", "ly"], symbol: "䷉ 履" },
  { names: ["arising", "tl"], symbol: "䷊ 泰" },
  { names: ["declining", "pi"], symbol: "䷋ 否" },
  { names: ["people together", "tsrf"], symbol: "䷌ 同人" },
  { names: ["great possessions", "dayb"], symbol: "䷍ 大有" },
  { names: ["humility", "qm"], symbol: "䷎ 謙" },
  { names: ["excitement", "yu"], symbol: "䷏ 豫" },
  { names: ["following", "sv"], symbol: "䷐ 隨" },
  { names: ["restoration", "gu"], symbol: "䷑ 蠱" },
  { names: ["pressing forward", "ln"], symbol: "䷒ 臨" },
  { names: ["contemplation", "gr"], symbol: "䷓ 觀" },
  { names: ["biting through", "uihe"], symbol: "䷔ 噬嗑" },
  { names: ["adornment", "bf"], symbol: "䷕ 賁" },
  { names: ["collapse", "bo"], symbol: "䷖ 剝" },
  { names: ["returning", "fu"], symbol: "䷗ 復" },
  { names: ["wronged", "wuwh"], symbol: "䷘ 無妄" },
  { names: ["great restraint", "daxu"], symbol: "䷙ 大畜" },
  { names: ["hunger", "yi"], symbol: "䷚ 頤" },
  { names: ["excess", "dago"], symbol: "䷛ 大過" },
  { names: ["water", "uv"], symbol: "䷜ 坎" },
  { names: ["fire", "ho"], symbol: "䷝ 離" },
  { names: ["intermingling", "xm"], symbol: "䷞ 咸" },
  { names: ["perseverance", "hg"], symbol: "䷟ 恒" },
  { names: ["retiring", "dp"], symbol: "䷠ 遯" },
  { names: ["pushing", "davd"], symbol: "䷡ 大壯" },
  { names: ["striding", "jn"], symbol: "䷢ 晉" },
  { names: ["dark times", "m;yi"], symbol: "䷣ 明夷" },
  { names: ["family", "jwrf"], symbol: "䷤ 家人" },
  { names: ["alienation", "kv"], symbol: "䷥ 睽" },
  { names: ["constricted", "jm"], symbol: "䷦ 蹇" },
  { names: ["released", "jx"], symbol: "䷧ 解" },
  { names: ["increase", "sp"], symbol: "䷨ 損" },
  { names: ["decrease", "2yi"], symbol: "䷩ 益" },
  { names: ["judged", "gy"], symbol: "䷪ 夬" },
  { names: ["encounter", "gb"], symbol: "䷫ 姤" },
  { names: ["congregating", "cv"], symbol: "䷬ 萃" },
  { names: ["ascending", "ug"], symbol: "䷭ 升" },
  { names: ["oppression", "kp"], symbol: "䷮ 困" },
  { names: ["wellspring", "j;"], symbol: "䷯ 井" },
  { names: ["revolution", "ge"], symbol: "䷰ 革" },
  { names: ["cauldron", "d;"], symbol: "䷱ 鼎" },
  { names: ["quaking", "lz"], symbol: "䷲ 震" },
  { names: ["stillness", "gf"], symbol: "䷳ 艮" },
  { names: ["graduation", "2jm"], symbol: "䷴ 漸" },
  { names: ["rejection", "gvmz"], symbol: "䷵ 歸妹" },
  { names: ["establishment", "fg"], symbol: "䷶ 豐" },
  { names: ["wandering", "2ly"], symbol: "䷷ 旅" },
  { names: ["penetrating", "2fg"], symbol: "䷸ 巽" },
  { names: ["joyous", "ze"], symbol: "䷹ 兌" },
  { names: ["dissolution", "hr"], symbol: "䷺ 渙" },
  { names: ["discipline", "2jx"], symbol: "䷻ 節" },
  { names: ["contemplation", "vsfu"], symbol: "䷼ 中孚" },
  { names: ["small exceeds", "xcgo"], symbol: "䷽ 小過" },
  { names: ["completion", "jiji"], symbol: "䷾ 既濟" },
  { names: ["continuation", "wzji"], symbol: "䷿ 未濟" },
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
