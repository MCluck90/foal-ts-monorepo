import { updateState } from '@optiqs/optiqs'
import { put, takeEvery } from 'typed-redux-saga/macro'
import { createAction } from '~/common/actions'
import { newTaskTextLens } from '../app.lenses'

export const setNewTaskText = createAction(
  'APP/SET_NEW_TASK_TEXT',
  (newTaskText: string) => ({ newTaskText }),
)

export const setNewTaskTextSaga = takeEvery(
  setNewTaskText,
  function* ({ payload: { newTaskText } }) {
    yield* put(updateState(newTaskTextLens.set(newTaskText)))
  },
)
