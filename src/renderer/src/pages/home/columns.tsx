import { ColumnDef } from '@tanstack/react-table'
import { t } from '@lingui/macro'
import { Badge } from 'renderer/components/ui/badge'
import { Checkbox } from 'renderer/components/ui/checkbox'
import { labels, difficulties, statuses } from './data/data'
import { Task } from './data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="!translate-y-0"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="!translate-y-0"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 45
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t`Document`} />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">{row.getValue('title')}</span>
        </div>
      )
    },
    size: 0
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t`Status`} />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 120
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => <DataTableColumnHeader column={column} title={t`Difficulty`} />,
    cell: ({ row }) => {
      const difficulty = difficulties.find(
        (difficulty) => difficulty.value === row.getValue('difficulty')
      )

      if (!difficulty) {
        return null
      }

      return (
        <div className="flex items-center">
          {difficulty.icon && <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{difficulty.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    size: 120
  }
]
