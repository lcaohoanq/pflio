import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3000,
  },
  define: {
    global: "window",
  },
});
