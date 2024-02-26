import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons'
import { Trans } from '@lingui/macro'

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
]

export const statuses = [
  {
    value: 'backlog',
    label: <Trans>Have doubts</Trans>,
    icon: QuestionMarkCircledIcon
  },
  {
    value: 'todo',
    label: <Trans>Todo</Trans>,
    icon: CircleIcon
  },
  {
    value: 'in progress',
    label: <Trans>In Progress</Trans>,
    icon: StopwatchIcon
  },
  {
    value: 'done',
    label: <Trans>Done</Trans>,
    icon: CheckCircledIcon
  }
]

export const difficulties = [
  {
    label: <Trans>Low</Trans>,
    value: 'low',
    icon: ArrowDownIcon
  },
  {
    label: <Trans>Medium</Trans>,
    value: 'medium',
    icon: ArrowRightIcon
  },
  {
    label: <Trans>High</Trans>,
    value: 'high',
    icon: ArrowUpIcon
  }
]
