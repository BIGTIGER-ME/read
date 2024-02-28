import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { lingui } from '@lingui/vite-plugin'

const commonAlias = {
  locales: resolve('src/locales'),
  schemas: resolve('src/schemas')
}

export default defineConfig({
  main: {
    resolve: {
      alias: {
        ...commonAlias,
        main: resolve('src/main')
      }
    },
    plugins: [externalizeDepsPlugin(), swcPlugin(), lingui()]
  },
  preload: {
    resolve: {
      alias: {
        ...commonAlias,
        main: resolve('src/main')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        ...commonAlias,
        renderer: resolve('src/renderer/src')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: ['macros']
        }
      }),
      lingui()
    ]
  }
})
