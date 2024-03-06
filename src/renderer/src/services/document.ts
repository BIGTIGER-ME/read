import {
  IDocumentUISchema as IDocument,
  IDocumentDBSchema,
  IDocumentCreateUISchema as IDocumentCreateSchema,
  TDocumentUpdatableField
} from 'schemas/document'
import { fileToUint8Array } from 'renderer/utils'

function transform(document: IDocumentDBSchema): IDocument {
  const documentContent = JSON.parse(document.content)
  const cover = document.cover && new File([document.cover], 'cover')

  if (cover) {
    const media = documentContent.content.find((item) => item.type === 'media')

    media.attrs.cover = cover
  }

  return {
    ...document,
    cover,
    content: documentContent,
    updatedAt: document.updated_at,
    createdAt: document.created_at
  }
}

export async function list(): Promise<IDocument[]> {
  const documents = await window.api.document.list()

  return documents.map(transform)
}

export async function get(id: IDocument['id']): Promise<IDocument> {
  const data = await window.api.document.get(id)

  return transform(data)
}

export async function remove(id: IDocument['id']): Promise<void> {
  await window.api.document.remove(id)
}

export async function create({ content, cover }: IDocumentCreateSchema): Promise<IDocument> {
  const created = await window.api.document.create({
    content: JSON.stringify(content),
    cover: cover && (await fileToUint8Array(cover))
  })

  return transform(created)
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

  return transform(updated)
}
