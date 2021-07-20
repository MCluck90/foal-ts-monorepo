import { call } from 'typed-redux-saga/macro'
import { Result } from '@utility/common/result'
import { TasksApiGetResponse } from '@utility/common/types/api/tasks.api'

const getTasks = () =>
  fetch('/tasks')
    .then((resp) => resp.json())
    .then((response) => {
      if (response.error) {
        throw response.error
      }

      return response
    })

export const appApi = {
  /**
   * Fetch server state
   */
  get: function* (): Generator<unknown, Result<TasksApiGetResponse, string>> {
    try {
      const response: TasksApiGetResponse = yield* call(getTasks)
      return Result.Ok(response)
    } catch (error) {
      return Result.Err(error)
    }
  },
}
