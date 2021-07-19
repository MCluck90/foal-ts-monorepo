import { updateState } from '@optiqs/optiqs'
import { TaskDto } from '@utility/common/dtos'
import { Result } from '@utility/common/result'
import { flow } from 'fp-ts/lib/function'
import { call, put, select, takeLatest } from 'typed-redux-saga/macro'
import { createAction } from '~/common/actions'
import { errorLens, loadingLens, tasksLens } from '../app.lenses'

export const fetchTasks = createAction('APP/FETCH_TASKS')

const getTasks = () =>
  fetch('/tasks')
    .then((resp) => resp.json())
    .then((response) => {
      if (response.error) {
        throw response.error
      }

      return response
    })

const tasksApi = {
  get: function* (): Generator<unknown, Result<TaskDto[], string>> {
    try {
      const tasks: TaskDto[] = yield* call(getTasks)
      return Result.Ok(tasks)
    } catch (error) {
      return Result.Err(error)
    }
  },
}

export const fetchTasksSaga = takeLatest(fetchTasks, function* () {
  const runningSaga = tasksApi.get()
  yield* put(updateState(loadingLens.set(true)))

  const result = yield* runningSaga
  if (result.isOk()) {
    yield* put(
      updateState(
        flow(
          loadingLens.set(false),
          tasksLens.set(result.unwrap()),
          errorLens.set(undefined),
        ),
      ),
    )
  } else {
    const tasks = (yield* select(tasksLens.get)) || []
    yield* put(
      updateState(
        flow(
          loadingLens.set(false),
          tasksLens.set(tasks),
          errorLens.set(result.unwrapErr()),
        ),
      ),
    )
  }
})
