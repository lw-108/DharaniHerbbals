import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// import compress from "vite-plugin-compress"; // removed due to incompatibility
// import { VitePWA } from "vite-plugin-pwa"; // PWA disabled for faster build

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),


    // compress({}) // removed due to incompatibility
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
