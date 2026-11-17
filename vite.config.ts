import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    VitePWA({
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
        manifest: {
            name: 'Heretic-Monkey.link Playground',
            short_name: 'Heretic-Monkey.link',
            description: 'Various experiments in web technology.',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        },
        injectRegister: 'auto',
        strategies: 'generateSW'
      })
  ]
});