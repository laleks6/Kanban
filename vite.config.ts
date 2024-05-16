/* eslint-disable import/no-extraneous-dependencies */
// import { defineConfig } from "vitest/config"; // if you are using a shared config, make sure to change this import from 'vite'
// export default defineConfig({
//   // ... stuff here
//   test: {
//     environment: "jsdom", // This right here
//   },
// });
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/To-do",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
});
