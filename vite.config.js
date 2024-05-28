// vite.config.js
import { resolve } from 'path'

export default {
    // config options
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about/index.html'),
                projects: resolve(__dirname, 'projects/index.html'),
            }
    }
  }
}