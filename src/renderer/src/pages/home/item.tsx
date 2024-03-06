import { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import { useEditor } from 'renderer/hooks/editor'
import CoverImage from 'renderer/components/cover-image'
import { IDocumentUISchema as IDocument } from 'schemas/document'

interface IItemProps {
  data: IDocument
}

const words = 2000

function Item({ data }: IItemProps) {
  const navigate = useNavigate()
  const editor = useEditor({ content: data.content })
  const detail = useMemo(() => {
    if (!editor) return null
    const title = editor.$node('title', { level: 1 })

    return {
      title: title?.textContent,
      content: editor.getHTML()
    }
  }, [editor])

  if (!detail) return null
  return (
    <div className="space-y-3 w-[250px]">
      <div
        className="overflow-hidden rounded-md border bg-card shadow h-[200px] cursor-pointer"
        onClick={() => navigate(`/read/${data.id}`)}
      >
        <CoverImage
          content={detail.content}
          src={data.cover && URL.createObjectURL(data.cover)}
          className="h-full w-full object-cover transition-all hover:scale-105 aspect-[3/4]"
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3
          className="font-medium leading-none whitespace-nowrap	overflow-hidden text-ellipsis"
          title={detail.title}
        >
          {detail.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          <Trans>About {words} words</Trans>
        </p>
      </div>
    </div>
  )
}

export default Item
