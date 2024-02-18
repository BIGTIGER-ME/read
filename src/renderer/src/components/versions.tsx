import { useState } from 'react'
import { Separator } from 'renderer/components/ui/separator'
import { cn } from 'renderer/utils'

interface Props {
  className: string
}

function Versions({ className }: Props) {
  const [versions] = useState(window.electron.process.versions)

  return (
    <div className={cn('flex h-5 items-center space-x-4 text-sm', className)}>
      <div>Electron v{versions.electron}</div>
      <Separator orientation="vertical" />
      <div>Chromium v{versions.chrome}</div>
      <Separator orientation="vertical" />
      <div>Node v{versions.node}</div>
    </div>
  )
}

export default Versions
