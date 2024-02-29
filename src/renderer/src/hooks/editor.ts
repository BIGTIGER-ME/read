import { useEditor as useTiptapEditor, Content, EditorOptions } from '@tiptap/react'
import { EditorProps } from '@tiptap/pm/view'
import { Document } from '@tiptap/extension-document'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Heading } from '@tiptap/extension-heading'
import { ListItem } from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Blockquote } from '@tiptap/extension-blockquote'
import { Image } from '@tiptap/extension-image'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { History } from '@tiptap/extension-history'
import Media from 'renderer/components/editor/media'

interface IEditorOptions {
  content: Content
  editorProps?: EditorProps
  onUpdate?: EditorOptions['onUpdate']
}

export function useEditor({ content, editorProps, onUpdate }: IEditorOptions) {
  const editor = useTiptapEditor({
    content,
    editorProps,
    extensions: [
      Heading.extend({
        name: 'title',
        levels: [1]
      }),
      Heading,
      Paragraph,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Text,
      History,
      Media,
      Document.extend({
        content: 'title media block*'
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'title') {
            return 'What’s the title?'
          }
          return ''
        }
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          style: 'width: 100%'
        }
      })
    ],
    onUpdate: onUpdate ?? (() => {})
  })

  return editor
}
