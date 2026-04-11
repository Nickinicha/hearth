import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/hearth/",
  define: {
    "process.env.PUBLIC_URL": JSON.stringify("/hearth"),
  },
  plugins: [react()],
  server: {
    open: "/hearth/forest.html",
  },
  build: {
    rollupOptions: {
      input: {
        forest: resolve(__dirname, "forest.html")
      }
    }
  }
});
