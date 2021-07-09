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

export const createConnection = async (
  type: ConnectionType = 'default',
): Promise<Connection> => {
  const config = await connectionOptionsReader.get(type)
  const connection = await typeORMCreateConnection({
    ...config,
    type: 'sqlite',
    database: path.join(process.cwd(), `${type}.db`),
    entities: [__dirname + '/entity/**/*.{js,ts}'],
    migrations: [__dirname + '/migration/**/*.{js,ts}'],
    subscribers: [__dirname + '/subscriber/**/*.{js,ts}'],
  })
  await connection.runMigrations()
  return connection
}
