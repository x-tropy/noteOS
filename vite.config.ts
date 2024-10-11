import { defineConfig } from "vite";
import ViteRails from 'vite-plugin-rails'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  clearScreen: false,
  plugins: [
    vue(),
    ViteRails({
      fullReload: {
        additionalPaths: ["config/routes.rb", "app/views/**/*"],
        delay: 200
      }
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: "app/javascript/entrypoints/application.js",
    },
  },
});
