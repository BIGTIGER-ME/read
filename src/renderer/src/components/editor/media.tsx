import { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useDropzone } from 'react-dropzone'
import { cn } from 'renderer/utils'

declare module '@tiptap/core' {
  interface Commands {
    media: {
      getMedia: () => { cover?: File }
    }
  }
}

interface IPreviewProps {
  value: File
  onChange?: () => void
}

interface IUploadProps {
  value: File | null
  onChange: (file: File | null) => void
}

function Preview({ value, onChange }: IPreviewProps) {
  return (
    <NodeViewWrapper>
      <img
        src={URL.createObjectURL(value)}
        className="w-full m-0 block"
        onClick={(e) => {
          e.stopPropagation()
          onChange?.()
        }}
      />
    </NodeViewWrapper>
  )
}

function Upload({ value, onChange }: IUploadProps) {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { 'image/*': [] }, multiple: false })

  useEffect(() => {
    const file = acceptedFiles[0]

    if (file) onChange(file)
  }, [acceptedFiles])

  return (
    <NodeViewWrapper>
      <div
        {...getRootProps({
          className: cn(
            'flex flex-col items-center !bg-transparent border-2 border-dashed rounded-sm border-slate-200 outline-none transition-[border] hover:border-slate-950 dark:border-slate-700	dark:hover:border-slate-50 cursor-pointer',
            {
              'border-slate-950 dark:border-slate-50': isFocused || isDragAccept,
              'border-rose-600': isDragReject
            }
          )
        })}
      >
        <input {...getInputProps()} />
        {value ? (
          <Preview value={value} onChange={() => onChange(null)} />
        ) : (
          <p className="text-sm text-muted-foreground !my-10">
            <Trans>Drag and drop an image or click here to upload a cover image</Trans>
          </p>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export default Node.create<{ preview?: boolean }>({
  name: 'media',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      cover: {
        default: null
      }
    }
  },
  addCommands: () => {
    return {
      getMedia:
        () =>
        ({ editor }) =>
          editor.$node('media')?.attributes
    }
  },
  parseHTML() {
    return [
      {
        tag: 'media'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['media', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer((props) => {
      const cover = props.node.attrs.cover

      return this.options.preview ? (
        <Preview value={cover} />
      ) : (
        <Upload
          value={cover}
          onChange={(file) => props.updateAttributes({ cover: file })}
        />
      )
    })
  }
})
