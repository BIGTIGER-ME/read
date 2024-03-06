import { createContext, useEffect, useState, PropsWithChildren } from 'react'
import { Theme, LOCAL_STROAGE_THEME } from 'renderer/constants/theme'

type ThemeProviderState = {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
}

const getTheme = () => (window.localStorage.getItem(LOCAL_STROAGE_THEME) as Theme) ?? Theme.System
const getIsDark = () => {
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  return media.matches
}
const initialState: ThemeProviderState = {
  theme: getTheme(),
  isDark: getIsDark(),
  setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function Provider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<Theme>(getTheme())
  const [isDark, setIsDark] = useState<boolean>(getIsDark())

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    window.localStorage.setItem(LOCAL_STROAGE_THEME, theme)
    switch (theme) {
      case Theme.System:
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = (e: MediaQueryListEvent) => {
          setIsDark(e.matches)
          root.classList.remove('light', 'dark')
          root.classList.add(e.matches ? 'dark' : 'light')
        }

        setIsDark(media.matches)
        root.classList.add(media.matches ? 'dark' : 'light')
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
      default:
        setIsDark(theme === Theme.Dark)
        root.classList.add(theme === Theme.Dark ? 'dark' : 'light')

        return
    }
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export default Provider
