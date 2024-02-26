import { ipcMain, ipcRenderer } from 'electron'
import { Repository } from 'typeorm'
import { DataBase } from 'main/utils/database'
import { MessageModel } from 'main/models/message'

const MESSAGE_ALL_CHANNEL = 'MESSAGE_ALL'
const MESSAGE_CREATE_CHANNEL = 'MESSAGE_CREATE'

type IMessage = {
  id: number
  content: string
}

export const methods = {
  all(): Promise<IMessage[]> {
    return ipcRenderer.invoke(MESSAGE_ALL_CHANNEL)
  },
  create({ content }: Pick<IMessage, 'content'>): Promise<IMessage[]> {
    return ipcRenderer.invoke(MESSAGE_CREATE_CHANNEL, { content })
  }
}

class Service extends DataBase {
  private readonly _repository: Repository<MessageModel>

  constructor() {
    super('message', [MessageModel])
    this._repository = this.getRepository(MessageModel)
  }

  public async listen() {
    await this.initialize()
    ipcMain.handle(MESSAGE_ALL_CHANNEL, () => this._all())
    ipcMain.handle(MESSAGE_CREATE_CHANNEL, async (_event, data: MessageModel) => this._create(data))
  }

  private async _all(): Promise<IMessage[]> {
    const messages = await this._repository.find()

    return messages.map((message) => ({
      id: message.id,
      content: message.content
    }))
  }

  private async _create(data: MessageModel): Promise<IMessage[]> {
    await this._repository.save(data)
    const messages = await this._repository.find()

    return messages.map((message) => ({
      id: message.id,
      content: message.content
    }))
  }
}

export default Service
