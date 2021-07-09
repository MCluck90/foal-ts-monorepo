import path from 'path'
import 'reflect-metadata'
export * from 'typeorm'

import {
  Connection,
  ConnectionOptionsReader,
  createConnection as typeORMCreateConnection,
} from 'typeorm'

const connectionOptionsReader = new ConnectionOptionsReader({
  root: path.resolve(__dirname, '..'),
})

export type ConnectionType = 'default' | 'integration'

let connection: Connection | null = null
export const createConnection = async (
  type: ConnectionType = 'default',
): Promise<Connection> => {
  if (!connection) {
    const config = await connectionOptionsReader.get(type)
    connection = await typeORMCreateConnection({
      ...config,
      entities: [__dirname + '/entity/**/*.{js,ts}'],
      migrations: [__dirname + '/migration/**/*.{js,ts}'],
      subscribers: [__dirname + '/subscriber/**/*.{js,ts}'],
    })
  }
  return connection
}
