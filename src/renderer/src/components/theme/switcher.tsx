import { useContext } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from 'renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'renderer/components/ui/dropdown-menu'
import { Theme } from 'renderer/constants/theme'
import { ThemeProviderContext } from './provider'

function Switcher() {
  const { setTheme } = useContext(ThemeProviderContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.Light)}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.Dark)}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.System)}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Switcher
