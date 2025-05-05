import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://luisurruela-newera.github.io",
  base: "/linkeamexico/",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],
});
