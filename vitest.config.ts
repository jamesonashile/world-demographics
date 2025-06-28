import {defineConfig } from "vitest/config";
import path from "path";


export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "next/navigation": path.resolve(
        __dirname,
        "tests/__mocks__/next/navigation.ts"
      ),
    },
  },
});