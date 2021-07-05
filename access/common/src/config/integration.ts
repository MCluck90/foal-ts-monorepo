import * as path from 'path'
import { ConnectionOptions } from 'typeorm'
import defaultConfig from '../../ormconfig.js'

export const integrationConnectionConfig: ConnectionOptions = {
  ...defaultConfig,
  name: 'integration',
  dropSchema: true,
  synchronize: true,
  database: path.join(__dirname, '../../integration.db'),
  loggerLevel: 'debug',
}
