import { useNavigate } from 'react-router-dom'
import { addDays } from 'date-fns/addDays'
import { addHours } from 'date-fns/addHours'
import { format } from 'date-fns/format'
import { nextSaturday } from 'date-fns/nextSaturday'
import { Archive, Clock, ChevronLeft, MoreVertical, Trash2, Undo, Redo } from 'lucide-react'
import { Removable, NotRemovable } from 'renderer/components/removable'
import { DropdownMenuContent, DropdownMenuItem } from 'renderer/components/ui/dropdown-menu'
import { Button } from 'renderer/components/ui/button'
import { Calendar } from 'renderer/components/ui/calendar'
import { DropdownMenu, DropdownMenuTrigger } from 'renderer/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from 'renderer/components/ui/popover'
import { Separator } from 'renderer/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from 'renderer/components/ui/tooltip'

function Head() {
  const today = new Date()
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
                  <span className="sr-only">Back</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archive</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Clock className="h-4 w-4" />
                      <span className="sr-only">Snooze</span>
                    </Button>
                  </TooltipTrigger>
                </PopoverTrigger>
                <PopoverContent className="flex w-[535px] p-0">
                  <div className="flex flex-col gap-2 border-r px-2 py-4">
                    <div className="px-4 text-sm font-medium">Snooze until</div>
                    <div className="grid min-w-[250px] gap-1">
                      <Button variant="ghost" className="justify-start font-normal">
                        Later today{' '}
                        <span className="ml-auto text-muted-foreground">
                          {format(addHours(today, 4), 'E, h:m b')}
                        </span>
                      </Button>
                      <Button variant="ghost" className="justify-start font-normal">
                        Tomorrow
                        <span className="ml-auto text-muted-foreground">
                          {format(addDays(today, 1), 'E, h:m b')}
                        </span>
                      </Button>
                      <Button variant="ghost" className="justify-start font-normal">
                        This weekend
                        <span className="ml-auto text-muted-foreground">
                          {format(nextSaturday(today), 'E, h:m b')}
                        </span>
                      </Button>
                      <Button variant="ghost" className="justify-start font-normal">
                        Next week
                        <span className="ml-auto text-muted-foreground">
                          {format(addDays(today, 7), 'E, h:m b')}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <Calendar />
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
          </div>
        </NotRemovable>
        <NotRemovable>
          <div className="ml-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                  <span className="sr-only">Undo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                  <span className="sr-only">Redo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Star thread</DropdownMenuItem>
                <DropdownMenuItem>Add label</DropdownMenuItem>
                <DropdownMenuItem>Mute thread</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NotRemovable>
      </div>
    </Removable>
  )
}

export default Head
