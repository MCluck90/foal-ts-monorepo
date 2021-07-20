import React from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import type { DispatchProps, StateProps } from '../app.route'
import { Theme } from '~/theme'
import { Task } from './task.component'
import { CreateTodo } from './create-todo.component'
import { Error } from './error.component'

const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
  },
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
  },
  header: {
    backgroundColor: Theme.BackgroundColor,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: Theme.TextColor,
  },
  link: {
    color: '#61dafb',
  },

  '@keyframes logoSpin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  '@media (prefers-reduced-motion: no-preference)': {
    logo: {
      animation: '$logoSpin infinite 20s linear',
    },
  },
})

export interface AppProps extends StateProps, DispatchProps {}

export const App: React.FC<AppProps> = ({
  tasks,
  createTask,
  fetchTasks,
  loading,
  error,
  isInitialized,
}) => {
  const styles = useStyles()
  if (!isInitialized) {
    fetchTasks()
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>Todos</h1>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <CreateTodo onSave={createTask} />
            <Error error={error} onTryAgain={fetchTasks} />
            <div>
              {(tasks || []).map((task) => (
                <Task key={task.id} {...task} onChange={fetchTasks} />
              ))}
            </div>
          </>
        )}
      </header>
    </div>
  )
}
