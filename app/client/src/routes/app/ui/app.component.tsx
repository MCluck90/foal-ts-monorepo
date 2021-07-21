import React from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import type { DispatchProps, StateProps } from '../app.route'
import { TaskList } from './task-list'
import { Link } from 'react-router-dom'
import { mergeClasses, useRouteStyles } from '~/common/styles'

const useStyles = createUseStyles({
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
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
  const styles = mergeClasses(useRouteStyles(), useStyles())
  if (!isInitialized) {
    fetchTasks()
  }

  return (
    <div className={styles.root}>
      <Link to="/theme" className={styles.link}>
        Change Theme
      </Link>
      <main className={styles.main}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1 className={styles.header}>Todos</h1>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <TaskList
            error={error}
            tasks={tasks}
            createTask={createTask}
            fetchTasks={fetchTasks}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        )}
      </main>
    </div>
  )
}
