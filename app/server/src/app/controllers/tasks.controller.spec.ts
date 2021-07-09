import { ok, strictEqual } from 'assert'
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseCreated,
  isHttpResponseNoContent,
  isHttpResponseOK,
} from '@foal/core'
import { TasksController } from './tasks.controller'
import { AdministrationManager } from '@manager/administration'
import { setupServiceManager } from '~/setup'

describe('TasksController', () => {
  let controller: TasksController

  beforeEach(async () => {
    const serviceManager = await setupServiceManager()
    controller = createController(TasksController, {
      administrationManager: serviceManager.get(AdministrationManager),
    })
  })

  describe('has a "getTasks" method that', () => {
    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(TasksController, 'getTasks'), 'GET')
      strictEqual(getPath(TasksController, 'getTasks'), '/')
    })
  })

  describe('has a "storeTask" method that', () => {
    it('should handle requests at POST /.', () => {
      strictEqual(getHttpMethod(TasksController, 'storeTask'), 'POST')
      strictEqual(getPath(TasksController, 'storeTask'), '/')
    })
  })

  describe('has an "updateTask" method that', () => {
    it('should handle requests at PUT /.', () => {
      strictEqual(getHttpMethod(TasksController, 'updateTask'), 'PUT')
      strictEqual(getPath(TasksController, 'updateTask'), '/')
    })
  })

  describe('has an "deleteTask" method that', () => {
    it('should handle requests at DELETE /.', () => {
      strictEqual(getHttpMethod(TasksController, 'deleteTask'), 'DELETE')
      strictEqual(getPath(TasksController, 'deleteTask'), '/')
    })
  })
})
