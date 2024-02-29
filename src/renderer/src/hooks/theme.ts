import { useContext } from 'react'
import { ThemeProviderContext } from 'renderer/components/theme/provider'

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeProviderContext)

  return { theme, setTheme }
}
