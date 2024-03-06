import { useCallback, createElement } from 'react'
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
  List,
  ListOrdered,
  Undo,
  Redo,
  LucideIcon
} from 'lucide-react'
import { QuoteIcon, TextIcon } from '@radix-ui/react-icons'
import { Removable, NotRemovable } from 'renderer/components/removable'
import { DropdownMenuContent, DropdownMenuItem } from 'renderer/components/ui/dropdown-menu'
import { Button } from 'renderer/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from 'renderer/components/ui/dropdown-menu'
import { Separator } from 'renderer/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from 'renderer/components/ui/tooltip'
import { useCreate } from 'renderer/hooks/document'

interface IHeadProps {
  editor: Editor
}

interface IHeadingIconProps {
  level: Level
}

type Level = 2 | 3 | 4

const headings: { [level in Level]: LucideIcon } = {
  [2]: Heading2,
  [3]: Heading3,
  [4]: Heading4
}

function HeadingIcon({ level }: IHeadingIconProps) {
  return createElement(headings[level] ?? Heading, { className: 'h-4 w-4' })
}

function Head({ editor }: IHeadProps) {
  const navigate = useNavigate()
  const create = useCreate()
  const handleCreate = useCallback(async () => {
    const media = editor.commands.getMedia()
    const content = editor.getJSON()
    const data = await create({ content, cover: media.cover })

    navigate(`/read/${data.id}`, { replace: true })
  }, [editor, create, navigate])

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
                  <HeadingIcon level={editor.getAttributes('heading')?.level} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {Object.entries(headings).map(([level, icon]) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: parseInt(level) as Level })
                        .run()
                    }
                  >
                    {createElement(icon, {
                      className: 'mr-2 h-3.5 w-3.5 text-muted-foreground/70'
                    })}
                    <Trans>Heading {level}</Trans>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  <QuoteIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Quote</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => editor.chain().focus().clearNodes().run()}
                >
                  <TextIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Text</Trans>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Trans>Bullet List</Trans>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleCreate}>
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
