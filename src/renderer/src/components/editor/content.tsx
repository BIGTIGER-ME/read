import { EditorContent, Editor } from '@tiptap/react'

interface IEditorProps {
  editor: Editor | null
}

function Content({ editor }: IEditorProps) {
  return <EditorContent className="prose mx-auto dark:prose-invert" editor={editor} />
}

export default Content
