import { createElement, useCallback } from 'react'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tiptap/core'
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
import { useRemove, useUpdate } from 'renderer/hooks/document'
import { IDocumentUISchema as IDocument, Status } from 'schemas/document'

interface IHeadProps {
  editor: Editor
  data: IDocument
}

const statuses = [
  { id: Status.Todo, icon: CircleIcon, label: <Trans>Todo</Trans> },
  { id: Status.Doing, icon: StopwatchIcon, label: <Trans>In Progress</Trans> },
  { id: Status.Backlog, icon: QuestionMarkCircledIcon, label: <Trans>Have doubts</Trans> },
  { id: Status.Done, icon: CheckCircledIcon, label: <Trans>Done</Trans> }
]

function Head({ editor, data }: IHeadProps) {
  const navigate = useNavigate()
  const back = useCallback(() => navigate(-1), [navigate])
  const remove = useRemove(data.id)
  const update = useUpdate(data.id)
  const handleRemove = useCallback(async () => {
    remove()
    back()
  }, [remove, back])

  return (
    <Removable>
      <div className="flex items-center p-2 pl-[85px]">
        <NotRemovable>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={back}>
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
                <Button
                  size="icon"
                  variant={data.archived ? 'secondary' : 'ghost'}
                  onClick={() => update({ archived: !data.archived })}
                >
                  <Archive className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Archive</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRemove}>
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Undo</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Redo</Trans>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {createElement(
                    statuses.find((status) => status.id === data.status)?.icon ?? CircleIcon,
                    { strokeWidth: 2, className: 'h-4 w-4' }
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {statuses.map((status) => (
                  <DropdownMenuItem key={status.id} onClick={() => update({ status: status.id })}>
                    {createElement(status.icon, {
                      strokeWidth: 2,
                      className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70'
                    })}
                    {status.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NotRemovable>
      </div>
    </Removable>
  )
}

export default Head
