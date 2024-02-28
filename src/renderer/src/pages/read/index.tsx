import { useParams } from 'react-router-dom'
import { Separator } from 'renderer/components/ui/separator'
import { TooltipProvider } from 'renderer/components/ui/tooltip'
import * as Editor from 'renderer/components/editor'
import { useEditor } from 'renderer/hooks/editor'
import { useFetch, useUpdate } from 'renderer/hooks/document'
import { IDocumentUISchema as IDocument } from 'schemas/document'
import Head from './head'

interface IMainProps {
  data: IDocument
}

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
          <Editor.Content editor={editor} />
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
