import { useParams } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import { Separator } from 'renderer/components/ui/separator'
import { TooltipProvider } from 'renderer/components/ui/tooltip'
import * as Editor from 'renderer/components/editor'
import { useEditor } from 'renderer/hooks/editor'
import { useFetch, useUpdate } from 'renderer/hooks/document'
import { IDocumentUISchema as IDocument, Difficulty } from 'schemas/document'
import { cn } from 'renderer/utils'
import Head from './head'

interface IMainProps {
  data: IDocument
}

const difficulties = [
  { id: Difficulty.Low, label: '😄', tip: t`Easy, a walk in the park.` },
  { id: Difficulty.Medium, label: '🙂', tip: t`Moderate, just right for me.` },
  { id: Difficulty.High, label: '😫', tip: t`Too difficult, my brain is about to smoke` }
]

function Main({ data }: IMainProps) {
  const update = useUpdate(data.id)
  const editor = useEditor({
    content: data.content,
    editorProps: {
      handleTextInput: () => true,
      handleKeyDown: (_, e) => {
        switch (e.key) {
          case 'Enter':
          case 'Backspace':
            return true
          default:
            return false
        }
      }
    },
    onUpdate: ({ editor }) => {
      update({ content: editor.getJSON() })
    }
  })

  if (!editor) return null
  return (
    <TooltipProvider delayDuration={0}>
      <Head editor={editor} data={data} />
      <Separator />
      <div className="flex-1 overflow-auto">
        <div className="p-11">
          {/* <Editor.Content editor={editor} /> */}
          <div className="text-center my-16">
            <p className="text-xs mb-4 text-muted-foreground">
              <Trans>What do you think about the difficulty level of this article?</Trans>
            </p>
            <div className="text-center	text-5xl flex justify-center gap-3">
              {difficulties.map((difficulty) => (
                <span
                  key={difficulty.id}
                  title={difficulty.tip}
                  onClick={() => update({ difficulty: difficulty.id })}
                  className={cn('cursor-pointer block transition-transform', {
                    ['grayscale-[100%] scale-[0.93] hover:scale-100']:
                      data.difficulty && data.difficulty !== difficulty.id
                  })}
                >
                  {difficulty.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function Read() {
  const { id } = useParams()
  const { data } = useFetch(parseInt(id as string))

  if (!data) return null
  return (
    <div className="flex h-full flex-col">
      <Main data={data} />
    </div>
  )
}

export default Read
