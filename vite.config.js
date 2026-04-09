import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    open: "/forest.html"
  },
  build: {
    rollupOptions: {
      input: {
        forest: resolve(__dirname, "forest.html")
      }
    }
  }
});
