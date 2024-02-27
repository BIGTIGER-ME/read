import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'
import { Archive, ChevronLeft, Trash2, Undo, Redo } from 'lucide-react'
import { Removable, NotRemovable } from 'renderer/components/removable'
import { Button } from 'renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'renderer/components/ui/dropdown-menu'
import { Separator } from 'renderer/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from 'renderer/components/ui/tooltip'

function Head() {
  const navigate = useNavigate()

  return (
    <Removable>
      <div className="flex items-center p-2 pl-[85px]">
        <NotRemovable>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Back</Trans>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Archive</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Remove</Trans>
              </TooltipContent>
            </Tooltip>
          </div>
        </NotRemovable>
        <NotRemovable>
          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Undo</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Redo</Trans>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon">
                      <StopwatchIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Trans>Status</Trans>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <StopwatchIcon strokeWidth={2} className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>In Progress</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleIcon strokeWidth={2} className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Todo</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <QuestionMarkCircledIcon strokeWidth={2} className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Have doubts</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckCircledIcon strokeWidth={2} className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Done</Trans>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NotRemovable>
      </div>
    </Removable>
  )
}

export default Head
