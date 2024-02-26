import { useNavigate } from 'react-router-dom'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Import } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { t, Trans } from '@lingui/macro'
import { Button } from 'renderer/components/ui/button'
import { Input } from 'renderer/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { difficulties, statuses } from './data/data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const navigate = useNavigate()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={t`Filter documents...`}
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title={t`Status`}
            options={statuses}
          />
        )}
        {table.getColumn('difficulty') && (
          <DataTableFacetedFilter
            column={table.getColumn('difficulty')}
            title={t`Difficulty`}
            options={difficulties}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <Trans>Reset</Trans>
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          navigate('/create')
        }}
      >
        <Import className="mr-2 h-4 w-4" /> Import
      </Button>
    </div>
  )
}
