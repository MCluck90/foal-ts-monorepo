import { connect } from 'react-redux'
import { createMapStateToProps } from '~/common/lenses'
import {
  errorLens,
  loadingLens,
  newTaskTextLens,
  tasksLens,
} from './app.lenses'
import { fetchTasks } from './effects'
import { App as AppComponent } from './ui'

const mapStateToProps = createMapStateToProps({
  tasks: tasksLens,
  newTaskText: newTaskTextLens,
  loading: loadingLens,
  error: errorLens,
})

const mapDispatchToProps = {
  fetchTasks,
}

export type StateProps = ReturnType<typeof mapStateToProps>
export type DispatchProps = typeof mapDispatchToProps

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
