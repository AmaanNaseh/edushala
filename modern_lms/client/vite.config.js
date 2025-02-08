import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa"; // Importing the named export

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "EduShala", // Ensure this matches the desired name
        short_name: "EduShala",
        description: "A Progressive Web App for Smart Education",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/icon-192x192.png", // Ensure the icon paths are correct
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
