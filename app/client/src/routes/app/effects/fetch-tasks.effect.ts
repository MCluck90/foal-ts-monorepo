import { updateState } from '@optiqs/optiqs'
import { call, put, takeEvery } from 'typed-redux-saga/macro'
import { createAction } from '~/common/actions'
import { tasksLens } from '../app.lenses'

export const fetchTasks = createAction('APP/FETCH_TASKS')

const getTasks = () => fetch('/tasks').then((resp) => resp.json())

export const fetchTasksSaga = takeEvery(fetchTasks, function* () {
  const result = yield* call(getTasks)
  yield* put(updateState(tasksLens.set(result)))
})
