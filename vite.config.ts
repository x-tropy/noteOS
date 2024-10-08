import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import FullReload from "vite-plugin-full-reload";
import StimulusHMR from "vite-plugin-stimulus-hmr";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  clearScreen: false,
  plugins: [
    RubyPlugin(),
    FullReload(["config/routes.rb", "app/views/**/*"], { delay: 200 }),
    StimulusHMR(),
    vue(),
  ],
  // assetsInclude: ["**/*.woff", "**/*.woff2"],
  build: {
    manifest: true,
    rollupOptions: {
      input: "app/javascript/entrypoints/application.js",
      output: {
        assetFileNames: "assets/[name].[hash][extname]", // Configure output for font files
      },
    },
  },
});
