import { useContext } from 'react'
import { ThemeProviderContext } from 'renderer/components/theme/provider'

export function useTheme() {
  const { theme, isDark, setTheme } = useContext(ThemeProviderContext)

  return { theme, isDark, setTheme }
}
