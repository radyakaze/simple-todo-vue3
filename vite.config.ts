import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Unfonts from 'unplugin-fonts/vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaIcons = [48, 72, 96, 128, 144, 152, 192, 384, 512]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
    Unfonts({
      google: {
        preconnect: true,
        families: [
          {
            name: 'Plus Jakarta Sans',
            styles: 'wght@300;400;500;700'
          }
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Simple ToDo',
        short_name: 'ToDo',
        description: 'Simple ToDo App',
        theme_color: '#ffffff',
        icons: pwaIcons.map((size) => ({
          src: `/assets/icons/icon-${size}x${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: size === 512 ? 'maskable any' : undefined
        }))
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
