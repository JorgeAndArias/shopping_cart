/// <reference types="vitest" /> i

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      },
    },
  },
});
