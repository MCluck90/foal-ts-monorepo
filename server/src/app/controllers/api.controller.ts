import { Context, dependency, Get, HttpResponseOK } from '@foal/core'
import { ApiService } from '~/app/services'

export class ApiController {
  @dependency
  apiService: ApiService

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK(this.apiService.sayHello())
  }
}
