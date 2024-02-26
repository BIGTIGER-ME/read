import { useRef } from 'react'
import { Node, findParentNode } from '@tiptap/core'
import {
  EditorContent,
  BubbleMenu,
  useEditor,
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent
} from '@tiptap/react'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { Image } from '@tiptap/extension-image'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { History } from '@tiptap/extension-history'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from 'renderer/components/ui/context-menu'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from 'renderer/components/ui/menubar'
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

const Test = Base.extend({
  name: 'test'
})

// define your extension array
const extensions = [
  Document.configure(),
  Heading.configure(),
  Paragraph.configure(),
  Text.configure(),
  Test.configure({ beforeContent: '(', afterContent: ')' }),
  History.configure(),
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      style: 'width: 100%'
    }
  })
]

const content = `
  <h1>Closing toilet-seat lids may not stop spread of germs</h1>
  <img src="data:image/jpeg;base64,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" alt="">
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>
  <p>Many people believe that putting the toilet-seat lid down helps to prevent the spread of dangerous germs and viruses. A recent study pretty much dispels this supposition. A team of microbiologists from the University of Arizona conducted research on the aerial activity of viral particles after a toilet is flushed. The scientists determined that there is little difference in the spread of germs, regardless of whether the lid is up or down. Microbiologist Dr Charles Gerba has been studying lavatory pathogens for nearly five decades. He said: "All that air when you flush goes somewhere, and it carries the viruses that are in the toilet bowl out of it." He said a flush forces bacteria out from under the lid and contaminates nearby areas.</p>
  <p>The researchers tested the spread of a test virus in two bathrooms after a flush. The virus was one not able to infect humans. They flushed one bowl with the lid up, and another with the lid down. After a minute, they used a sponge to swab the surfaces in the toilet. They concluded that there were no significant statistical differences in the quantities of the virus in the two bathrooms. They added that the results "demonstrate that closing the toilet lid prior to flushing does not mitigate the risk of contaminating bathroom surfaces, and that disinfection of all restroom surfaces may be necessary after flushing or after toilet-brush use" to cut the spread of germs. They also said it was important to disinfect the water in the bowl.</p>

`

const Tiptap = () => {
  const ref = useRef<HTMLDivElement>(null)
  const editor = useEditor({
    extensions,
    content,
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
    }
  })

  if (!editor) return null
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{ height: '100%' }}>
          {editor && (
            <BubbleMenu tippyOptions={{ placement: 'bottom' }} editor={editor}>
              <div ref={ref}>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>标注从句</MenubarTrigger>
                    <MenubarContent container={ref.current}>
                      <MenubarItem>定语从句</MenubarItem>
                      <MenubarSub>
                        <MenubarSubTrigger>名词性从句</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem
                            onClick={() => {
                              const { selection } = editor.state
                              const isActive = editor.isActive('test')

                              if (selection.to !== selection.from) {
                                editor.chain().setTest().focus().run()
                              } else if (isActive) {
                                editor.commands.removeTest()
                              }
                            }}
                          >
                            主语从句
                          </MenubarItem>
                          <MenubarItem>宾语从句</MenubarItem>
                          <MenubarItem>表语从句</MenubarItem>
                          <MenubarItem>同位语从句</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSub>
                        <MenubarSubTrigger>状语从句</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>时间状语从句</MenubarItem>
                          <MenubarItem>条件状语从句</MenubarItem>
                          <MenubarItem>地点状语从句</MenubarItem>
                          <MenubarItem>原因状语从句</MenubarItem>
                          <MenubarItem>结果状语从句</MenubarItem>
                          <MenubarItem>目的状语从句</MenubarItem>
                          <MenubarItem>让步状语从句</MenubarItem>
                          <MenubarItem>方式状语从句</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>添加笔记</MenubarTrigger>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>查词翻译</MenubarTrigger>
                    <MenubarContent container={ref.current}>
                      <MenubarItem>谷歌翻译</MenubarItem>
                      <MenubarItem>有道翻译</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </BubbleMenu>
          )}
          <EditorContent className="prose mx-auto" editor={editor} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default Tiptap