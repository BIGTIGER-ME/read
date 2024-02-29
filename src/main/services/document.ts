import { ipcMain, ipcRenderer } from 'electron'
import { DataSource, Repository } from 'typeorm'
import { Model } from 'main/models/document'
import { IDocumentDBSchema as IDocument, TDocumentUpdatableField } from 'schemas/document'

export const DOCUMENT_GET_CHANNEL = 'DOCUMENT_GET'
export const DOCUMENT_LIST_CHANNEL = 'DOCUMENT_LIST'
export const DOCUMENT_CREATE_CHANNEL = 'DOCUMENT_CREATE'
export const DOCUMENT_UPDATE_CHANNEL = 'DOCUMENT_UPDATE'
export const DOCUMENT_DELETE_CHANNEL = 'DOCUMENT_DELETE'

export const methods = {
  get: (id: IDocument['id']): Promise<IDocument> =>
    ipcRenderer.invoke(DOCUMENT_GET_CHANNEL, { id }),
  list: (): Promise<IDocument[]> => ipcRenderer.invoke(DOCUMENT_LIST_CHANNEL),
  create: (data: Pick<IDocument, 'content'>): Promise<IDocument> =>
    ipcRenderer.invoke(DOCUMENT_CREATE_CHANNEL, data),
  update: (
    id: IDocument['id'],
    data: Partial<Pick<IDocument, TDocumentUpdatableField>>
  ): Promise<IDocument> => ipcRenderer.invoke(DOCUMENT_UPDATE_CHANNEL, { id, data }),
  remove: (id: IDocument['id']) => ipcRenderer.invoke(DOCUMENT_DELETE_CHANNEL, { id })
}

class Service {
  private readonly _repository: Repository<Model>

  constructor(database: DataSource) {
    this._repository = database.getRepository(Model)
  }

  public async listen() {
    ipcMain.handle(DOCUMENT_GET_CHANNEL, (_, { id }: { id: IDocument['id'] }) => this._get(id))
    ipcMain.handle(DOCUMENT_LIST_CHANNEL, () => this._list())
    ipcMain.handle(DOCUMENT_CREATE_CHANNEL, (_, data: Pick<IDocument, 'content'>) =>
      this._create(data)
    )
    ipcMain.handle(
      DOCUMENT_UPDATE_CHANNEL,
      (_, { id, data }: { id: IDocument['id']; data: Pick<IDocument, 'content'> }) =>
        this._update(id, data)
    )
    ipcMain.handle(DOCUMENT_DELETE_CHANNEL, (_, { id }: { id: IDocument['id'] }) =>
      this._remove(id)
    )
  }

  private async _get(id: IDocument['id']): Promise<IDocument> {
    const document = await this._repository.findOneBy({ id })
    if (!document) throw new Error('document not found')

    return {
      id: document.id,
      content: document.content,
      status: document.status,
      archived: document.archived,
      difficulty: document.difficulty,
      created_at: document.created_at,
      updated_at: document.updated_at
    }
  }

  private async _create({ content }: Pick<Model, 'content'>): Promise<IDocument> {
    const document = this._repository.create({ content })

    console.log(content)
    // await this._repository.save(document)

    return {
      id: document.id,
      content: document.content,
      status: document.status,
      archived: document.archived,
      difficulty: document.difficulty,
      created_at: document.created_at,
      updated_at: document.updated_at
    }
  }

  private async _list(): Promise<IDocument[]> {
    const documents = await this._repository.find()

    return documents.map((document) => ({
      id: document.id,
      content: document.content,
      status: document.status,
      archived: document.archived,
      difficulty: document.difficulty,
      created_at: document.created_at,
      updated_at: document.updated_at
    }))
  }

  private async _update(
    id: IDocument['id'],
    { content, status, difficulty, archived }: Partial<Pick<IDocument, TDocumentUpdatableField>>
  ): Promise<IDocument> {
    const document = await this._repository.findOneBy({ id })
    if (!document) throw new Error('document not found')
    if (status) document.status = status
    if (content) document.content = content
    if (difficulty) document.difficulty = difficulty
    if (archived !== undefined) document.archived = archived
    const updated = await this._repository.save(document)

    return {
      id: updated.id,
      content: updated.content,
      status: updated.status,
      archived: document.archived,
      difficulty: updated.difficulty,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    }
  }

  private async _remove(id: IDocument['id']): Promise<void> {
    await this._repository.delete(id)
  }
}

export default Service
