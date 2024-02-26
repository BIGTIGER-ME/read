import { ipcMain } from 'electron'
import { Repository } from 'typeorm'
import { DataBase } from 'main/utils/database'
import { Document } from 'main/models'

export const DOCUMENT_LIST_EVENT = 'DOCUMENT_LIST'
export const DOCUMENT_CREATE_EVENT = 'DOCUMENT_CREATE'
export const DOCUMENT_UPDATE_EVENT = 'DOCUMENT_UPDATE'

class Service extends DataBase {
  private readonly _repository: Repository<Document.Model>

  constructor() {
    super('database', [Document.Model])
    this._repository = this.getRepository(Document.Model)
  }

  public async listen() {
    await this.initialize()
    ipcMain.handle(DOCUMENT_LIST_EVENT, () => this._list())
    ipcMain.handle(DOCUMENT_CREATE_EVENT, (_, { content }: Pick<Document.Model, 'content'>) =>
      this._create({ content })
    )
    ipcMain.handle(
      DOCUMENT_UPDATE_EVENT,
      (_, { id, content }: Pick<Document.Model, 'content' | 'id'>) => this._update(id, { content })
    )
  }

  private async _create({ content }: Pick<Document.Model, 'content'>) {
    const document = this._repository.create({ content })

    return await this._repository.save(document)
  }

  private async _list() {
    return await this._repository.find()
  }

  private async _update(id: number, { content }: Pick<Document.Model, 'content'>) {
    const document = await this._repository.findOneBy({ id })

    if (!document) throw new Error('document not found')
    document.content = content + Date.now()
    await this._repository.save(document)

    return document
  }
}

export default Service
