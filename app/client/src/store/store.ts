import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore,
  Reducer,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, SagaGenerator } from 'typed-redux-saga/macro'
import { createReducer, updateState } from '@optiqs/optiqs'
import { initialState } from './initial-state'
import { State } from '~/types'
import { routeSagas } from '~/routes/effects'

export const configureStore = <S>(
  reducer: Reducer<S>,
  sagas: () => Generator<SagaGenerator<unknown>>,
  initialState?: S,
) => {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
      : compose

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
  const store = reduxCreateStore(reducer, enhancer)

  sagaMiddleware.run(sagas)
  initialState && store.dispatch(updateState<S>(() => initialState))

  // TODO
  // Dispatch an action for the first route
  // store.dispatch(initializeApp())
  return { ...store, runSaga: sagaMiddleware.run }
}

export type Store = ReturnType<typeof configureStore>

const allSagas = {
  routeSagas,
}

function* rootSaga() {
  yield all(allSagas)
}

export const reducer = createReducer(initialState) as Reducer<State>

export const createStore = (state = initialState) =>
  configureStore(reducer, rootSaga, state)
