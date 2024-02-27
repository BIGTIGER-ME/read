import { HTMLAttributes } from 'react'
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

export function Sidebar({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            <Trans>Document</Trans>
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
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
              <Trans>All Documents</Trans>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Archive strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Archived</Trans>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-base font-semibold tracking-tight">
            <Trans>Status</Trans>
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <StopwatchIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>In Progress</Trans>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CircleIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Todo</Trans>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <QuestionMarkCircledIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Have doubts</Trans>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CheckCircledIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Done</Trans>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-base font-semibold tracking-tight">
            <Trans>Difficulty</Trans>
          </h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <ArrowUpIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>High</Trans>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ArrowRightIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Medium</Trans>
              <span className="ml-auto text-muted-foreground">1</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ArrowDownIcon strokeWidth={2} className="mr-2 h-4 w-4" />
              <Trans>Low</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
