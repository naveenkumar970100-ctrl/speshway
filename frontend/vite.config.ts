import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: { overlay: false },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // ALL React + ecosystem must stay in one chunk to avoid duplicate context
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/scheduler/") ||
            id.includes("node_modules/@radix-ui/") ||
            id.includes("node_modules/next-themes/")
          ) return "react-core";
          // Framer Motion
          if (id.includes("node_modules/framer-motion/")) return "motion";
          // Charts
          if (id.includes("node_modules/recharts/")) return "charts";
          // Tanstack
          if (id.includes("node_modules/@tanstack/")) return "tanstack";
          // Lucide icons
          if (id.includes("node_modules/lucide-react/")) return "icons";
          // Everything else from node_modules
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
