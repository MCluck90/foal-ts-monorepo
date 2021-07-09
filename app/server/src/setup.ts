import { Connection, ConnectionType, createConnection } from '@access/common'
import { TaskAccess } from '@access/task'
import { ValidationEngine } from '@engine/validation'
import { ClassOrAbstractClass, ServiceManager } from '@foal/core'
import { AdministrationManager } from '@manager/administration'

export const setupServiceManager = async (
  connectionType: ConnectionType = 'default',
) => {
  const serviceManager = new ServiceManager()
  const register = <TInstance>(
    tClass: ClassOrAbstractClass,
    instance: TInstance,
  ): TInstance => {
    serviceManager.set(tClass, instance)
    return instance
  }

  const connection = register(
    Connection,
    await createConnection(connectionType),
  )

  const taskAccess = register(TaskAccess, new TaskAccess(connection))
  const validationEngine = register(ValidationEngine, new ValidationEngine())
  register(
    AdministrationManager,
    new AdministrationManager(taskAccess, validationEngine),
  )

  return serviceManager
}
