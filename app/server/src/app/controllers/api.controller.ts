import { Connection } from '@access/common'
import { Context, dependency, Get, HttpResponseOK } from '@foal/core'
import { AdministrationManager } from '@manager/administration'
import { ApiService } from '~/app/services'

export class ApiController {
  @dependency
  apiService: ApiService

  @dependency
  administrationManager: AdministrationManager

  @dependency
  connection: Connection

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK(this.apiService.sayHello())
  }

  @Get('/tasks')
  getTasks(ctx: Context) {
    console.log(this.connection.manager)
    return new HttpResponseOK()
    // return new HttpResponseOK(this.administrationManager.findTasks({}))
  }
}
