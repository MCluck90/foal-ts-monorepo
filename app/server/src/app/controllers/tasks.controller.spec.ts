// std
import { ok, strictEqual } from 'assert'

// 3p
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseOK,
} from '@foal/core'

// App
import { TasksController } from './tasks.controller'

describe('TasksController', () => {
  let controller: TasksController

  beforeEach(() => (controller = createController(TasksController)))

  describe('has a "foo" method that', () => {
    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(TasksController, 'foo'), 'GET')
      strictEqual(getPath(TasksController, 'foo'), '/')
    })

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({})
      ok(isHttpResponseOK(controller.foo(ctx)))
    })
  })
})
