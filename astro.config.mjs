import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://luisurruela-newera.github.io",
  base: "/linkeamexico/",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), react(), netlify()],
});
