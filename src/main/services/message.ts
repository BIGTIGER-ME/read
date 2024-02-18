import { DataBase } from 'main/utils/database'
import { MessageModel } from 'main/models/message'

const db = new DataBase('message', [MessageModel])
const repo = db.getRepository(MessageModel)

export async function all() {
  await db.initialize()
  const messages = await repo.find()
  await db.destroy()

  return messages
}

export async function create(data: MessageModel) {
  await db.initialize()
  await repo.save(data)
  const messages = await repo.find()
  await db.destroy()

  return messages
}
