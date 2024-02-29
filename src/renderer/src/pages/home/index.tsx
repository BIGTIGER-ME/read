import { useState } from 'react'
import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from 'renderer/components/ui/button'
import { Separator } from 'renderer/components/ui/separator'
import { Removable, NotRemovable } from 'renderer/components/removable'
import { useList } from 'renderer/hooks/document'
import { IDocumentUISchema as IDocument } from 'schemas/document'
import { cn } from 'renderer/utils'
import nodata from 'renderer/assets/images/no_data.svg'
import Sidebar from './sidebar'
import Item from './item'

function Home() {
  const navigate = useNavigate()
  const { data } = useList()
  const [filtered, setFiltered] = useState<IDocument[]>([])

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full w-[230px]">
        <Removable>
          <div className="min-h-[52px] text-center" />
        </Removable>
        <Sidebar data={data} className="hidden lg:block" onChange={setFiltered} />
      </div>
      <div className="h-full flex-1 border-l overflow-x-hidden">
        <div className="flex flex-col h-full">
          <Removable>
            <div className="flex items-center justify-between px-8 pt-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <Trans>Good morning, reader!</Trans>
                </h2>
                <p className="text-sm text-muted-foreground">
                  <Trans>Every new day is another chance to change your life.</Trans>
                </p>
              </div>
              <NotRemovable>
                <Button onClick={() => navigate('/create')}>
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  <Trans>Add document</Trans>
                </Button>
              </NotRemovable>
            </div>
          </Removable>
          <div className="px-8">
            <Separator className="mt-4 w-full" />
          </div>
          <div className="flex-1 h-full box-border overflow-x-hidden px-8 pt-4">
            <div className={cn('flex flex-wrap gap-4 pb-4', { 'h-full': !filtered.length })}>
              {filtered.length ? (
                filtered.map((data) => (
                  <div className="basis-1/6" key={data.id}>
                    <Item data={data} />
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <img className="w-[280px]" src={nodata} />
                  <p className="mt-4 mb-20">
                    <Trans>No results</Trans>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
