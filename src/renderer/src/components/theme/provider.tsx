import { createContext, useEffect, useState, PropsWithChildren } from 'react'
import { Theme } from 'renderer/constants/common'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: Theme.System,
  setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function Provider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<Theme>(Theme.Dark)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    switch (theme) {
      case Theme.System:
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = (e: MediaQueryListEvent) => {
          root.classList.remove('light', 'dark')
          root.classList.add(e.matches ? 'dark' : 'light')
        }

        root.classList.add(media.matches ? 'dark' : 'light')
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
      default:
        root.classList.add(theme === Theme.Dark ? 'dark' : 'light')

        return
    }
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export default Provider
