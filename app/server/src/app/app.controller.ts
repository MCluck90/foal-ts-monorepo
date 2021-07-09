import { controller, IAppController } from '@foal/core'

import { ApiController, TasksController } from './controllers'

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/tasks', TasksController),
  ]

  async init() {}
}
