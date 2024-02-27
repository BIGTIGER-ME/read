import { DataBase } from 'main/utils/database'
import { Model as DocumentModel } from 'main/models/document'
import System from 'main/services/system'
import DocumentServ from 'main/services/document'

async function createHanlders() {
  const system = new System()
  const database = new DataBase('database', [DocumentModel])
  const document = new DocumentServ(database)

  system.listen()
  await database.initialize()
  document.listen()
}

export default createHanlders
