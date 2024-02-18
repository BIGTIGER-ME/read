import type { LinguiConfig } from '@lingui/conf'
import { Locale } from './src/locales/constants'

const config: LinguiConfig = {
  locales: [Locale.enUS, Locale.zhCN],
  sourceLocale: Locale.enUS,
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src/renderer/src', 'src/main']
    }
  ]
}

export default config
