import { all } from 'typed-redux-saga/macro'
import {
  createTaskSaga,
  fetchTasksSaga,
  removeTaskSaga,
  updateTaskSaga,
} from './effects'

export { App } from './app.route'
export type { AppRouteState } from './app.types'
export const appRouteSaga = all({
  createTaskSaga,
  fetchTasksSaga,
  removeTaskSaga,
  updateTaskSaga,
})
