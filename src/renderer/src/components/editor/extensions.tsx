import { Node, findParentNode } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from 'renderer/components/ui/tooltip'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    test: {
      /**
       * Toggle a paragraph
       */
      setTest: () => ReturnType
      removeTest: () => ReturnType
    }
  }
}

const Base = Node.create<{
  beforeContent: string
  afterContent: string
}>({
  group: 'inline',
  content: '(inline | text)*',
  inline: true,
  addOptions() {
    return {
      beforeContent: '[',
      afterContent: ']'
    }
  },
  parseHTML() {
    return [
      {
        tag: 'strong'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['strong', HTMLAttributes, 0]
  },
  addCommands: () => {
    return {
      setTest:
        () =>
        ({ tr, state }) => {
          const { selection, doc, schema } = state
          const content = doc.slice(selection.from, selection.to).content
          const test = schema.nodes.test.create(null, content)

          tr.replaceWith(selection.from, selection.to, test)
          return true
        },
      removeTest:
        () =>
        ({ state, tr }) => {
          const { schema, selection } = state
          const parseNode = findParentNode((node) => node.type === schema.nodes.test)(selection)

          if (parseNode) {
            tr.replaceWith(
              parseNode.pos,
              parseNode.pos + parseNode.node.nodeSize,
              parseNode.node.content
            )
            return true
          }
          return false
        }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(() => {
      return (
        <NodeViewWrapper as="span">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  tabIndex={0}
                  className="content"
                  data-before-content={this.options.beforeContent}
                  data-after-content={this.options.afterContent}
                >
                  <NodeViewContent as="span" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>宾语从句</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NodeViewWrapper>
      )
    })
  }
})

export const Test = Base.extend({
  name: 'test'
})
