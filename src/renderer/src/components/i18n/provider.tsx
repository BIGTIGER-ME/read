import { useState, useEffect, createContext, PropsWithChildren } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { Locale, LOCAL_STORAGE_KEY } from 'locales/constants'
import { messages as enUS } from 'locales/en_US.po'
import { messages as zhCN } from 'locales/zh_CN.po'

i18n.load(Locale.enUS, enUS)
i18n.load(Locale.zhCN, zhCN)

type LocaleProviderState = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const getSystemLocale = () =>
  (window.localStorage.getItem(LOCAL_STORAGE_KEY) ??
    window.navigator.language.replace('-', '_')) as Locale
const initialState: LocaleProviderState = {
  locale: getSystemLocale(),
  setLocale: () => null
}

export const LocaleProviderContext = createContext<LocaleProviderState>(initialState)

function Provider({ children }: PropsWithChildren<{}>) {
  const [locale, setLocale] = useState(getSystemLocale())

  useEffect(() => {
    i18n.activate(locale)
    window.electron.ipcRenderer.invoke('locales', locale)
    window.localStorage.setItem(LOCAL_STORAGE_KEY, locale)
  }, [locale])

  return (
    <LocaleProviderContext.Provider value={{ locale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleProviderContext.Provider>
  )
}

export default Provider
