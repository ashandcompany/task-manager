import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import lightningcss from "vite-plugin-lightningcss"
import { browserslistToTargets, Features } from "lightningcss"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    lightningcss({
      targets: browserslistToTargets([
        "> 0.5%",
        "last 2 versions",
        "not dead"
      ]),
      minify: true,
      include: Features.Colors | Features.Nesting,
    })
  ],
  css: {
    transformer: "lightningcss",
  },
  build: {
    cssMinify: "lightningcss",
  }
})
