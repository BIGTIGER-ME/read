import { useState, useRef } from 'react'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  OnChangeFn,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Row
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'renderer/components/ui/table'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const navigate = useNavigate()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })
  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting(updater)
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0)
    }
  }

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange
  }))

  return (
    <>
      <DataTableToolbar table={table} />
      <div className="rounded-md border overflow-auto relative flex-1" ref={tableContainerRef}>
        <Table className="grid">
          <TableHeader className="grid bg-background sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex items-center flex-1"
                      colSpan={header.colSpan}
                      style={{
                        maxWidth: header.column.columnDef.size ? header.getSize() : undefined
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`
            }}
          >
            {rowVirtualizer.getVirtualItems().length ? (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<TData>

                return (
                  <TableRow
                    className="flex w-full absolute h-12"
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    data-index={virtualRow.index}
                    ref={(node) => rowVirtualizer.measureElement(node)}
                    onClick={() => {
                      navigate('/read')
                    }}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="flex flex-1 items-center"
                        style={{
                          maxWidth: cell.column.columnDef.size ? cell.column.getSize() : undefined
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <tr className="mt-[250px] flex justify-center">
                <td colSpan={columns.length} className="text-center">
                  <Trans>No results found.</Trans>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
