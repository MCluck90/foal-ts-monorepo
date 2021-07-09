import { strictEqual } from 'assert'
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseOK,
} from '@foal/core'
import { ApiController } from '~/app/controllers/api.controller'

describe('ApiController', () => {
  describe('has a "index" method that', () => {
    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ApiController, 'index'), 'GET')
      strictEqual(getPath(ApiController, 'index'), '/')
    })

    it('should return a HttpResponseOK.', () => {
      const controller = createController(ApiController)
      const ctx = new Context({})

      const response = controller.index(ctx)

      if (!isHttpResponseOK(response)) {
        throw new Error('The response should be an instance of HttpResponseOK.')
      }

      strictEqual(response.body, 'Hello world!')
    })
  })
})
