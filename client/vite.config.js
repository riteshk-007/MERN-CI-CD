import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 5173,
    host: "0.0.0.0",
    allowedHosts: ["http://localhost:8000/api"],
  },
  plugins: [react()],
});
