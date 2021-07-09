import { createConnection } from '@access/common'
import { TaskAccess } from '@access/task'
import { ValidationEngine } from '@engine/validation'
import { ServiceManager } from '@foal/core'
import { AdministrationManager } from '@manager/administration'

export const setupServiceManager = async () => {
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

  return serviceManager
}
