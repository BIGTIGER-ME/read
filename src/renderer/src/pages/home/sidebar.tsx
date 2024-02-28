import { useState, useMemo, createElement } from 'react'
import { Trans } from '@lingui/macro'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'
import { Archive } from 'lucide-react'
import { Button } from 'renderer/components/ui/button'
import { cn } from 'renderer/utils'
import { IDocumentUISchema as IDocument, Status, Difficulty } from 'schemas/document'

interface ISidebarProps {
  className: string
  data: IDocument[]
  onChange: (data: IDocument[]) => void
}

function Sidebar({ className, data, onChange }: ISidebarProps) {
  const [active, setActive] = useState('common-all')
  const menus = useMemo(
    () => [
      {
        id: 'common',
        label: <Trans>Document</Trans>,
        fontSize: 'text-lg',
        submenus: [
          {
            id: 'all',
            label: <Trans>All Documents</Trans>,
            icon: () => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="m16 6 4 14" />
                <path d="M12 6v14" />
                <path d="M8 8v12" />
                <path d="M4 4v16" />
              </svg>
            ),
            items: data.filter((item) => !item.archived)
          },
          {
            id: 'archived',
            label: <Trans>Archived</Trans>,
            icon: Archive,
            items: data.filter((item) => item.archived)
          }
        ]
      },
      {
        id: 'status',
        label: <Trans>Status</Trans>,
        fontSize: 'text-base',
        submenus: [
          {
            id: Status.Todo,
            label: <Trans>Todo</Trans>,
            icon: CircleIcon,
            items: data.filter((item) => item.status === Status.Todo)
          },
          {
            id: Status.Doing,
            label: <Trans>In Progress</Trans>,
            icon: StopwatchIcon,
            items: data.filter((item) => item.status === Status.Doing)
          },
          {
            id: Status.Backlog,
            label: <Trans>Have doubts</Trans>,
            icon: QuestionMarkCircledIcon,
            items: data.filter((item) => item.status === Status.Backlog)
          },
          {
            id: Status.Done,
            label: <Trans>Done</Trans>,
            icon: CheckCircledIcon,
            items: data.filter((item) => item.status === Status.Done)
          }
        ]
      },
      {
        id: 'difficulty',
        label: <Trans>Difficulty</Trans>,
        fontSize: 'text-base',
        submenus: [
          {
            id: Difficulty.High,
            label: <Trans>High</Trans>,
            icon: ArrowUpIcon,
            items: data.filter((item) => item.difficulty === Difficulty.High)
          },
          {
            id: Difficulty.Medium,
            label: <Trans>Medium</Trans>,
            icon: ArrowRightIcon,
            items: data.filter((item) => item.difficulty === Difficulty.Medium)
          },
          {
            id: Difficulty.Low,
            label: <Trans>Low</Trans>,
            icon: ArrowDownIcon,
            items: data.filter((item) => item.difficulty === Difficulty.Low)
          }
        ]
      }
    ],
    [data]
  )

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4">
        {menus.map((menu) => (
          <div className="px-3 py-2" key={menu.id}>
            <h2 className={cn('mb-2 px-4 font-semibold tracking-tight', menu.fontSize)}>{menu.label}</h2>
            <div className="space-y-1">
              {menu.submenus.map((submenu) => (
                <Button
                  key={submenu.id}
                  variant={active === `${menu.id}-${submenu.id}` ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setActive(`${menu.id}-${submenu.id}`)
                    onChange(submenu.items)
                  }}
                >
                  {createElement(submenu.icon, { strokeWidth: 2, className: 'mr-2 h-4 w-4' })}
                  {submenu.label}
                  {submenu.items.length > 0 && (
                    <span className="ml-auto text-muted-foreground">{submenu.items.length}</span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
