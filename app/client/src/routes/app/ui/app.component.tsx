import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import type { DispatchProps, StateProps } from '../app.route'
import { Theme } from '~/theme'
import { Task } from './task.component'
import { TaskDto } from '@utility/common/dtos'

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

export const App: React.FC<AppProps> = () => {
  const styles = useStyles()
  const [tasks, setTasks] = useState<TaskDto[]>([])
  async function getTasks() {
    const response = await fetch('/tasks')
    const result = await response.json()
    if (Array.isArray(result)) {
      setTasks(result)
    }
  }
  useEffect(() => {
    getTasks()
  })

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>Todos</h1>
        <CreateTodo onSave={() => getTasks()} />
        <div>
          {tasks.map((task) => (
            <Task key={task.id} {...task} onChange={() => getTasks()} />
          ))}
        </div>
      </header>
    </div>
  )
}
