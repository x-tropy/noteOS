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
      serif: ["SourceSerifPro", "JuZhenJF", "NotoSerifSC"],
      sans: [
        "InterTight",
        "NotoSansSC",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Arial",
        "Helvetica",
        "Helvetica Neue",
        "sans-serif",
      ],
      mono: [
        "JetBrainsMono",
        "Consolas",
        "Menlo",
        "Monaco",
        "Andale Mono",
        "Ubuntu Mono",
        "monospace",
      ],
    },
    extend: {
      boxShadow: {
        'elevation-xs': '0 0 0 1px rgba(17,20,24,.15)',
        'elevation-sm': '0 0 0 1px rgba(17,20,24,.1),0 1px 1px rgba(17,20,24,.2)',
        'elevation': '0 0 0 1px rgba(17,20,24,.1),0 1px 1px rgba(17,20,24,.2),0 2px 6px rgba(17,20,24,.2)',
        'elevation-md': '0 0 0 1px rgba(17,20,24,.1),0 2px 4px rgba(17,20,24,.2),0 8px 24px rgba(17,20,24,.2)',
        'elevation-lg': '0 0 0 1px rgba(17,20,24,.1),0 4px 8px rgba(17,20,24,.2),0 18px 46px 6px rgba(17,20,24,.2)',
      },
      screens: {
        'xs': '500px',
        'std': '750px'
      },
      dropShadow: {
        'text': '0 0px 3px rgba(256, 256, 256, 1)'
      },
      aspectRatio: {
        '21/9': '21 / 9',
      },
      colors: {
        decoration: {
          blue: "#397CFF",
          red: "#FF5454",
          orange: "#FFA132",
          purple: "#944BFD",
          green: "#38BF09",
          black: "#5B564E"
        }
      }
    },
  },
  variants: {
    boxShadow: ['hover', 'active'], // Enable hover and active states for box-shadow
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
  safelist: [
    "text-decoration-blue",
    "text-decoration-red",
    "text-decoration-orange",
    "text-decoration-purple",
    "text-decoration-green",
    "text-decoration-black",
  ]
};
