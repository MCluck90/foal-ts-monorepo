import React from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import type { DispatchProps, StateProps } from '../app.route'
import { Theme } from '~/theme'
import { Task } from './task.component'
import { CreateTodo } from './create-todo.component'
import { Error } from './error.component'
import { ThemePicker } from './theme-picker.component'

const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
  },
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
  },
  main: {
    backgroundColor: Theme.BackgroundColor,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
  },
  header: {
    color: Theme.HeaderTextColor,
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
  removeTask,
  updateTask,
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
      <main className={styles.main}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.header}>Todos</h1>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <CreateTodo onSave={createTask} />
            <Error error={error} onTryAgain={fetchTasks} />
            <div>
              {(tasks || []).map((task) => (
                <Task
                  key={task.id}
                  {...task}
                  onChange={updateTask}
                  onRemove={removeTask}
                />
              ))}
            </div>
            <div>
              <ThemePicker themeKey={Theme.BackgroundColor} />
              <ThemePicker themeKey={Theme.PrimaryFont} />
              <ThemePicker themeKey={Theme.TextColor} />
              <ThemePicker themeKey={Theme.HeaderTextColor} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
