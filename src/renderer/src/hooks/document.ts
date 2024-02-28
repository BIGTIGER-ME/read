import { useCallback } from 'react'
import merge from 'lodash/merge'
import useSWR, { useSWRConfig } from 'swr'
import * as documentServ from 'renderer/services/document'
import { IDocumentUISchema as IDocument, TDoucumentUpdatableField } from 'schemas/document'

const DOCUMENT_LIST_KEY = 'DOCUMENT_LIST'
const DOCUMENT_ITEM_KEY = 'DOCUMENT_ITEM'

export function useList() {
  const { data, error, isLoading } = useSWR(DOCUMENT_LIST_KEY, () => documentServ.list())

  return { data: data ?? [], error, isLoading }
}

export function useFetch(id: IDocument['id']) {
  const { cache } = useSWRConfig()
  const response = useSWR(DOCUMENT_ITEM_KEY + id, () => documentServ.get(id), {
    fallbackData:
      cache[DOCUMENT_ITEM_KEY + id] ??
      (cache[DOCUMENT_LIST_KEY] as IDocument[] | undefined)?.find((item) => item.id === id)
  })

  return response
}

export function useCreate() {
  const { mutate } = useSWRConfig()
  const create = useCallback(
    async (content: IDocument['content']) => {
      const created = await documentServ.create({ content })

      await mutate(DOCUMENT_ITEM_KEY + created.id, created)
      await mutate(DOCUMENT_LIST_KEY, () => documentServ.list(), {
        optimisticData: (list: IDocument[] = []) => [...list, created]
      })

      return created
    },
    [mutate]
  )

  return create
}

export function useRemove(id: IDocument['id']) {
  const { mutate } = useSWRConfig()
  const remove = useCallback(async () => {
    await mutate(DOCUMENT_ITEM_KEY + id, () => documentServ.remove(id), {
      optimisticData: undefined
    })
    await mutate(DOCUMENT_LIST_KEY, () => documentServ.list(), {
      optimisticData: (list: IDocument[] = []) => list.filter((item) => item.id !== id)
    })
  }, [id, mutate])

  return remove
}

export function useUpdate(id: IDocument['id']) {
  const { mutate } = useSWRConfig()
  const update = useCallback(
    async (data: Partial<Pick<IDocument, TDoucumentUpdatableField>>) => {
      const updated = await mutate(DOCUMENT_ITEM_KEY + id, () => documentServ.update(id, data), {
        optimisticData: (cache) => merge(cache, data)
      })

      await mutate(DOCUMENT_LIST_KEY, () => documentServ.list(), {
        optimisticData: (list: IDocument[] = []) =>
          list.map((item) => (item.id === id ? merge(item, data) : item))
      })

      return updated
    },
    [mutate]
  )

  return update
}
