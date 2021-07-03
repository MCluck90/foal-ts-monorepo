import { ConnectionOptions } from 'typeorm'
import defaultConfig from '../../ormconfig.js'

export const integrationConnectionConfig: ConnectionOptions = {
  ...defaultConfig,
  database: 'integration.db',
  loggerLevel: 'debug',
}
