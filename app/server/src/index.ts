// std
import * as http from 'http'

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core'

// App
import { AppController } from './app/app.controller'
import { AdministrationManager } from '@manager/administration'
import { TaskAccess } from '@access/task'
import { createConnection } from '@access/common'
import { ValidationEngine } from '@engine/validation'

async function main() {
  const connection = await createConnection()
  await connection.runMigrations()

  const serviceManager = new ServiceManager()
  const taskAccess = new TaskAccess(connection)
  const validationEngine = new ValidationEngine()
  const administrationManager = new AdministrationManager(
    taskAccess,
    validationEngine,
  )
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
