
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/temples-api": {
        target: "https://www.thetemplesofindia.com",
        changeOrigin: true,
        secure: true,
        rewrite: () => "/api/v1/temples?limit=100",
      },
    },
  },
});
