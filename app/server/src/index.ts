// std
import * as http from 'http'

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core'

// App
import { AppController } from './app/app.controller'
import { AdministrationManager } from '@manager/administration'
import { TaskAccess } from '@access/task'
import { Connection, createConnection } from '@access/common'
import { ValidationEngine } from '@engine/validation'
import { Todo } from '@access/common/entity/todo'

async function main() {
  const serviceManager = new ServiceManager()
  const connection = await createConnection({
    type: 'sqlite',
    database: 'dev.db',
    synchronize: true,
    logging: false,
    entities: [Todo],
  })
  const taskAccess = new TaskAccess(connection)
  const validationEngine = new ValidationEngine()
  const administrationManager = new AdministrationManager(
    taskAccess,
    validationEngine,
  )
  serviceManager.set(Connection, connection)
  serviceManager.set(AdministrationManager, administrationManager)

  const app = await createApp(AppController, {
    serviceManager,
  })

  const httpServer = http.createServer(app)
  const port = Config.get('port', 'number', 3001)
  httpServer.listen(port, () => displayServerURL(port))
}

main().catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
