import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.linkeamexico.com/",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), react()],
});
