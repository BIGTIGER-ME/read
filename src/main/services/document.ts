import { ipcMain, ipcRenderer } from 'electron'
import { Repository } from 'typeorm'
import { DataBase } from 'main/utils/database'
import { Model, Status, Difficulty } from 'main/models/document'

export const DOCUMENT_LIST_CHANNEL = 'DOCUMENT_LIST'
export const DOCUMENT_CREATE_CHANNEL = 'DOCUMENT_CREATE'
export const DOCUMENT_UPDATE_CHANNEL = 'DOCUMENT_UPDATE'

type Document = {
  id: number
  content: string
  status: Status
  difficulty: Difficulty
  created_at: number
  updated_at: number
}

export const methods = {
  list: (): Promise<Document[]> => ipcRenderer.invoke(DOCUMENT_LIST_CHANNEL),
  create: (data: Pick<Document, 'content'>): Promise<Document> =>
    ipcRenderer.invoke(DOCUMENT_CREATE_CHANNEL, data),
  update: (id: number, data: Pick<Document, 'content'>): Promise<Document> =>
    ipcRenderer.invoke(DOCUMENT_UPDATE_CHANNEL, { id, data })
}

class Service extends DataBase {
  private readonly _repository: Repository<Model>

  constructor() {
    super('database', [Model])
    this._repository = this.getRepository(Model)
  }

  public async listen() {
    await this.initialize()
    ipcMain.handle(DOCUMENT_LIST_CHANNEL, () => this._list())
    ipcMain.handle(DOCUMENT_CREATE_CHANNEL, (_, data: Pick<Document, 'content'>) =>
      this._create(data)
    )
    ipcMain.handle(
      DOCUMENT_UPDATE_CHANNEL,
      (_, { id, data }: { id: Document['id']; data: Pick<Document, 'content'> }) =>
        this._update(id, data)
    )
  }

  private async _create({ content }: Pick<Model, 'content'>): Promise<Document> {
    const document = this._repository.create({ content })

    await this._repository.save(document)

    return {
      id: document.id,
      content: document.content,
      status: document.status,
      difficulty: document.difficulty,
      created_at: document.created_at,
      updated_at: document.updated_at
    }
  }

  private async _list(): Promise<Document[]> {
    const documents = await this._repository.find()

    return documents.map((document) => ({
      id: document.id,
      content: document.content,
      status: document.status,
      difficulty: document.difficulty,
      created_at: document.created_at,
      updated_at: document.updated_at
    }))
  }

  private async _update(id: number, { content }: Pick<Model, 'content'>): Promise<Document> {
    const document = await this._repository.findOneBy({ id })
    if (!document) throw new Error('document not found')
    document.content = content + Date.now()
    const updated = await this._repository.save(document)

    return {
      id: updated.id,
      content: updated.content,
      status: updated.status,
      difficulty: updated.difficulty,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    }
  }
}

export default Service
