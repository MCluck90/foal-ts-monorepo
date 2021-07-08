import { Context, dependency, Get, HttpResponseOK } from '@foal/core'
import { AdministrationManager } from '@manager/administration'
import { ApiService } from '~/app/services'

export class ApiController {
  @dependency
  apiService: ApiService

  @dependency
  administrationManager: AdministrationManager

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK(this.apiService.sayHello())
  }

  @Get('/tasks')
  async getTasks(ctx: Context) {
    let tasks = await this.administrationManager.findTasks({})
    if (tasks.length === 0) {
      await this.administrationManager.addTask({ text: 'Hello world' })
      tasks = await this.administrationManager.findTasks({})
    }
    return new HttpResponseOK(tasks)
  }
}
