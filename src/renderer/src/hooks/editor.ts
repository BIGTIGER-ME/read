import { useEditor as useTiptapEditor, Content, Extensions } from '@tiptap/react'
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

interface IEditorOptions {
  content: Content
  extensions?: Extensions
  editorProps?: EditorProps
}

export function useEditor({ content, editorProps, extensions = [] }: IEditorOptions) {
  const editor = useTiptapEditor({
    content,
    editorProps,
    extensions: [
      Heading,
      Paragraph,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      Text,
      History,
      Document.extend({
        content: 'heading block*'
      }),
      Placeholder.configure({
        placeholder: ({ node, pos }) => {
          if (node.type.name === 'heading' && node.attrs.level === 1 && pos === 0) {
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
      }),
      ...extensions
    ]
  })

  return editor
}