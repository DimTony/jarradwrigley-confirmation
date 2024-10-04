import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ["..", "node_modules/pdfjs-dist/build"], // Allow access to the worker files
    },
  },
});
