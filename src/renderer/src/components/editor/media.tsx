import { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useDropzone } from 'react-dropzone'
import { cn } from 'renderer/utils'

export default Node.create({
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
      const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
        useDropzone({ accept: { 'image/*': [] } })

      useEffect(() => {
        const file = acceptedFiles[0]

        if (file) {
          props.updateAttributes({ cover: file })
        }
      }, [acceptedFiles])

      return (
        <NodeViewWrapper className="react-component">
          <div>
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
              {props.node.attrs.cover ? (
                <img
                  src={URL.createObjectURL(props.node.attrs.cover)}
                  className="w-full m-0 block"
                  onClick={(e) => {
                    e.stopPropagation()
                    props.updateAttributes({ cover: null })
                  }}
                />
              ) : (
                <p className="text-sm text-muted-foreground !my-10">
                  <Trans>Drag and drop an image or click to upload a cover image</Trans>
                </p>
              )}
            </div>
          </div>
        </NodeViewWrapper>
      )
    })
  }
})
