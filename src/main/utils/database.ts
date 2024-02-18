import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { app } from 'electron'

export class DataBase extends DataSource {
  constructor(database: string, entities: DataSourceOptions['entities']) {
    const basePath = path.join(app.getPath('appData'), app.getName(), `./data/${database}.db`)

    super({
      type: 'better-sqlite3',
      entities: entities,
      database: basePath,
      synchronize: true
    })
  }
}
