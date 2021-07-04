import { ConnectionOptions } from 'typeorm'
import defaultConfig from '../../ormconfig.js'

export const integrationConnectionConfig: ConnectionOptions = {
  ...defaultConfig,
  dropSchema: true,
  synchronize: true, // TODO: Make integration tests use migrations
  database: 'integration.db',
  loggerLevel: 'debug',
}
