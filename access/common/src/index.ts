import path from 'path'
import 'reflect-metadata'
export * from 'typeorm'

import { Connection, ConnectionOptionsReader, createConnection } from 'typeorm'

const connectionOptionsReader = new ConnectionOptionsReader({
  root: path.resolve(__dirname, '..'),
})

let connection: Connection | null = null
export const connect = async (
  name: string = 'default',
): Promise<Connection> => {
  if (!connection) {
    const config = await connectionOptionsReader.get(name)
    connection = await createConnection({
      ...config,
      entities: [__dirname + '/entity/**/*.{js,ts}'],
      migrations: [__dirname + '/migration/**/*.{js,ts}'],
      subscribers: [__dirname + '/subscriber/**/*.{js,ts}'],
    })
  }
  return connection
}
