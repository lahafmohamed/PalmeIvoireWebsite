import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg:  { quality: 82 },
      jpeg: { quality: 82 },
      png:  { quality: 85 },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    // Keep individual chunks reasonably sized
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React runtime
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          // i18n
          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n'
          }
          // Icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
          // Head management
          if (id.includes('node_modules/@unhead')) {
            return 'unhead'
          }
        },
      },
    },
  },
})
