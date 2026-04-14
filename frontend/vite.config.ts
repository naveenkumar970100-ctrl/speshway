import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
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
          // Core React
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) return "react-core";
          // Radix UI
          if (id.includes("@radix-ui")) return "radix";
          // Framer Motion
          if (id.includes("framer-motion")) return "motion";
          // Charts
          if (id.includes("recharts")) return "charts";
          // Tanstack
          if (id.includes("@tanstack")) return "tanstack";
          // Lucide icons
          if (id.includes("lucide-react")) return "icons";
          // Everything else from node_modules
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
