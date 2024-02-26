import { useState, useRef, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
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
import { Removable } from 'renderer/components/removable'
import { DataTableToolbar } from './data-table-toolbar'
import { columns } from './columns'
import { taskSchema, Task } from './data/schema'
import data from './data/tasks.json'

const tasks = z.array(taskSchema).parse(data)

function Home() {
  const navigate = useNavigate()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data: tasks,
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

  useEffect(() => {
    window.electron.ipcRenderer.invoke('DOCUMENT_LIST').then((documents) => {
      console.log(documents)
    })
  }, [])

  return (
    <div className="flex flex-col max-h-screen h-screen">
      <Removable>
        <div className="min-h-[52px] text-center" />
      </Removable>
      <div className="flex-col space-y-4 px-8 pt-1 pb-8 flex flex-1 overflow-hidden">
        <div className="flex items-center justify-between space-y-2 mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Every new day is another chance to change your life.
            </p>
          </div>
        </div>
        <button
          onClick={async () => {
            const docs = await window.electron.ipcRenderer.invoke('DOCUMENT_CREATE', {
              content: 123123
            })
            console.log(docs)
          }}
        >
          create
        </button>
        <button
          onClick={async () => {
            const docs = await window.electron.ipcRenderer.invoke('DOCUMENT_UPDATE', {
              id: 8,
              content: '123123 - updated!!! -12xx3123'
            })
            console.log(docs)
          }}
        >
          update
        </button>
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
                  const row = rows[virtualRow.index] as Row<Task>

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
      </div>
    </div>
  )
}

export default Home
