import tailwindcss from "@tailwindcss/vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default",
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "src/$1" },
      { find: "@app", replacement: path.resolve("src/app") },
      { find: "@entities", replacement: path.resolve("src/entities") },
      { find: "@features", replacement: path.resolve("src/features") },
      { find: "@pages", replacement: path.resolve("src/pages") },
      { find: "@shared", replacement: path.resolve("src/shared") },
      { find: "@widgets", replacement: path.resolve("src/widgets") },
    ],
  },
});
