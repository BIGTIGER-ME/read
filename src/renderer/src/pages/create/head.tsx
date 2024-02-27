import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tiptap/core'
import {
  ChevronLeft,
  Check,
  Heading,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Undo,
  Redo
} from 'lucide-react'
import { QuoteIcon } from '@radix-ui/react-icons'
import { Removable, NotRemovable } from 'renderer/components/removable'
import { DropdownMenuContent, DropdownMenuItem } from 'renderer/components/ui/dropdown-menu'
import { Button } from 'renderer/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from 'renderer/components/ui/dropdown-menu'
import { Separator } from 'renderer/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from 'renderer/components/ui/tooltip'

interface IHeadProps {
  editor: Editor
}

function Head({ editor }: IHeadProps) {
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
            <Separator orientation="vertical" className="mx-2 h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Heading className="h-4 w-4" />
                  <span className="sr-only">Heading</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <Heading2 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Heading 2</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heading3 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Heading 3</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heading4 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Heading 4</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heading5 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Heading 5</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heading6 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  <Trans>Heading 6</Trans>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <QuoteIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Quote</Trans>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Bullist</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Ordered List</Trans>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const _editor = new Editor({
                      content: editor.getJSON(),
                      extensions: editor.extensionManager.extensions
                    })
                    const h1 = _editor.$node('heading', { level: 1 })
                    console.log(h1?.textContent)
                  }}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Add document</Trans>
              </TooltipContent>
            </Tooltip>
          </div>
        </NotRemovable>
      </div>
    </Removable>
  )
}

export default Head
