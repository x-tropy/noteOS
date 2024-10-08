/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/views/**/*.{html,html.erb,erb}",
    "./app/javascript/components/**/*.vue",
  ],
  theme: {
    fontFamily: {
      serif: ["SourceSerifPro", "Juzhen"],
      sans: [
        "InterTight",
        "BlinkMacSystemFont",
        "Noto Sans",
        "Segoe UI",
        "Arial",
        "Helvetica",
        "Helvetica Neue",
        "sans-serif",
      ],
      mono: [
        "Jetbrains Mono",
        "Consolas",
        "Menlo",
        "Monaco",
        "Andale Mono",
        "Ubuntu Mono",
        "monospace",
      ],
    },
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
