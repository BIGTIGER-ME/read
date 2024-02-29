import { useState, useMemo, useEffect, createElement } from 'react'
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

enum MenuId {
  Common = 'COMMON',
  Status = 'STATUS',
  Difficulty = 'DIFFICULTY'
}

enum CommonSubmenuId {
  All = 'ALL',
  Archived = 'ARCHIVED'
}

function Sidebar({ className, data, onChange }: ISidebarProps) {
  const [active, setActive] = useState<[string, string]>([MenuId.Common, CommonSubmenuId.All])
  const menus = useMemo(() => {
    const all = data.filter((item) => !item.archived)

    return {
      [MenuId.Common]: {
        label: <Trans>Document</Trans>,
        fontSize: 'text-lg',
        submenus: {
          [CommonSubmenuId.All]: {
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
            items: all
          },
          [CommonSubmenuId.Archived]: {
            label: <Trans>Archived</Trans>,
            icon: Archive,
            items: data.filter((item) => item.archived)
          }
        }
      },
      [MenuId.Status]: {
        label: <Trans>Status</Trans>,
        fontSize: 'text-base',
        submenus: {
          [Status.Todo]: {
            label: <Trans>Todo</Trans>,
            icon: CircleIcon,
            items: all.filter((item) => item.status === Status.Todo)
          },
          [Status.Doing]: {
            label: <Trans>In Progress</Trans>,
            icon: StopwatchIcon,
            items: all.filter((item) => item.status === Status.Doing)
          },
          [Status.Backlog]: {
            label: <Trans>Have doubts</Trans>,
            icon: QuestionMarkCircledIcon,
            items: all.filter((item) => item.status === Status.Backlog)
          },
          [Status.Done]: {
            label: <Trans>Done</Trans>,
            icon: CheckCircledIcon,
            items: all.filter((item) => item.status === Status.Done)
          }
        }
      },
      [MenuId.Difficulty]: {
        label: <Trans>Difficulty</Trans>,
        fontSize: 'text-base',
        submenus: {
          [Difficulty.High]: {
            label: <Trans>High</Trans>,
            icon: ArrowUpIcon,
            items: all.filter((item) => item.difficulty === Difficulty.High)
          },
          [Difficulty.Medium]: {
            label: <Trans>Medium</Trans>,
            icon: ArrowRightIcon,
            items: all.filter((item) => item.difficulty === Difficulty.Medium)
          },
          [Difficulty.Low]: {
            label: <Trans>Low</Trans>,
            icon: ArrowDownIcon,
            items: all.filter((item) => item.difficulty === Difficulty.Low)
          }
        }
      }
    }
  }, [data])

  useEffect(() => {
    const items: IDocument[] | undefined = menus[active[0]]?.submenus?.[active[1]]?.items
    if (items) onChange(items)
  }, [active, menus, onChange])

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4">
        {Object.entries(menus).map(([menuId, menu]) => (
          <div className="px-3 py-2" key={menuId}>
            <h2 className={cn('mb-2 px-4 font-semibold tracking-tight', menu.fontSize)}>
              {menu.label}
            </h2>
            <div className="space-y-1">
              {Object.entries(menu.submenus).map(([submenuId, submenu]) => (
                <Button
                  key={submenu.id}
                  variant={active[0] === menuId && active[1] === submenuId ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setActive([menuId, submenuId])
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
