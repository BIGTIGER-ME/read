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
import { Media } from 'renderer/components/editor'

interface IEditorOptions {
  content: Content
  mode?: Mode
  editorProps?: EditorProps
  onUpdate?: EditorOptions['onUpdate']
}

export enum Mode {
  Reading = 'reading'
}

export function useEditor({ content, mode, editorProps, onUpdate }: IEditorOptions) {
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
      Media.configure({
        preview: mode === Mode.Reading
      }),
      Heading.extend({ name: 'title', levels: [1] }),
      Document.extend({
        content: 'title media block*'
      }),
      Placeholder.configure({
        placeholder: ({ node }) => (node.type.name === 'title' ? 'What’s the title?' : '')
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
