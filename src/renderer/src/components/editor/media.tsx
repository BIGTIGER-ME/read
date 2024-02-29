import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'

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
      return (
        <NodeViewWrapper className="react-component">
          <div className="content">
            {props.node.attrs.cover ? (
              <img
                onClick={() => props.updateAttributes({ cover: null })}
                src={URL.createObjectURL(props.node.attrs.cover)}
                width="100%"
              />
            ) : (
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]

                  if (file) {
                    props.updateAttributes({
                      cover: file
                    })
                  }
                }}
              />
            )}
            
          </div>
        </NodeViewWrapper>
      )
    })
  }
})
