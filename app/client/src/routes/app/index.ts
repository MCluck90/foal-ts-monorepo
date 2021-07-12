import { all } from 'typed-redux-saga/macro'
import { fetchTasksSaga, setNewTaskTextSaga } from './effects'

export { App } from './app.route'
export type { AppRouteState } from './app.types'
export const appRouteSaga = all({
  fetchTasksSaga,
  setNewTaskTextSaga,
})
