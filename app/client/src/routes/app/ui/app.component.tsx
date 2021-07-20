import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import type { DispatchProps, StateProps } from '../app.route'
import { Theme } from '~/theme'
import { Task } from './task.component'

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

interface CreateTodoProps {
  onSave?: () => void
}

const CreateTodo: React.FC<CreateTodoProps> = ({ onSave }) => {
  const [text, setText] = useState('')
  const onClick = () => {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then(() => {
        setText('')
        onSave?.()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <input
        type="input"
        value={text}
        onChange={(evt) => setText(evt.currentTarget.value)}
        onKeyDown={(evt) => (evt.key === 'Enter' ? onClick() : null)}
      />
      <button onClick={onClick}>Save</button>
    </div>
  )
}

export interface AppProps extends StateProps, DispatchProps {}

interface ErrorProps {
  error?: string
  onTryAgain?: () => unknown
}

const Error: React.FC<ErrorProps> = ({ error, onTryAgain }) => {
  if (!error) {
    return null
  }

  return (
    <div>
      <span>There was an error: {error}</span>
      <button onClick={onTryAgain}>Try again</button>
    </div>
  )
}

export const App: React.FC<AppProps> = ({
  tasks,
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
            <CreateTodo onSave={fetchTasks} />
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
