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

const storeTask = (text: string) =>
  fetch('/tasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw error.error
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

  /**
   * Create a new task
   */
  createTask: function* (
    text: string,
  ): Generator<unknown, Result<void, string>> {
    try {
      yield* call(storeTask, text)
      return Result.Ok()
    } catch (error) {
      return Result.Err(error)
    }
  },
}
