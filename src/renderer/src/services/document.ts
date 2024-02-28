import { IDocumentUISchema as IDocument, TDocumentUpdatableField } from 'schemas/document'

export async function list(): Promise<IDocument[]> {
  const documents = await window.api.document.list()

  return documents.map((data) => ({
    ...data,
    content: JSON.parse(data.content),
    updatedAt: data.updated_at,
    createdAt: data.created_at
  }))
}

export async function get(id: IDocument['id']): Promise<IDocument> {
  const data = await window.api.document.get(id)

  return {
    ...data,
    content: JSON.parse(data.content),
    updatedAt: data.updated_at,
    createdAt: data.created_at
  }
}

export async function remove(id: IDocument['id']): Promise<void> {
  await window.api.document.remove(id)
}

export async function create(data: Pick<IDocument, 'content'>): Promise<IDocument> {
  const created = await window.api.document.create({
    content: JSON.stringify(data.content)
  })

  return {
    ...created,
    content: JSON.parse(created.content),
    updatedAt: created.updated_at,
    createdAt: created.created_at
  }
}

export async function update(
  id: IDocument['id'],
  data: Partial<Pick<IDocument, TDocumentUpdatableField>>
) {
  const updated = await window.api.document.update(id, {
    content: data.content && JSON.stringify(data.content),
    status: data.status,
    archived: data.archived,
    difficulty: data.difficulty
  })

  return {
    ...updated,
    content: JSON.parse(updated.content),
    updatedAt: updated.updated_at,
    createdAt: updated.created_at
  }
}
