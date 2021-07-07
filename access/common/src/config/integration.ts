import { ConnectionOptions } from 'typeorm'
import defaultConfig from '../../ormconfig.js'

export const integrationConnectionConfig: ConnectionOptions = {
  ...defaultConfig,
  name: 'integration',
  dropSchema: true,
  synchronize: true,
  database: 'integration.db',
  loggerLevel: 'debug',
}
