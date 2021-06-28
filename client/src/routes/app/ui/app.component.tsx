import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import logo from '~/assets/logo.svg'
import { Theme } from '~/theme'

const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
  },
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
  },
  header: {
    backgroundColor: Theme.Background,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: Theme.Text,
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

export function App() {
  const styles = useStyles()
  const [text, setText] = useState('')
  useEffect(() => {
    async function run() {
      if (text) {
        return
      }

      const response = await fetch('/api')
      const result = await response.text()
      setText(result)
    }
    run()
  })

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>{text}</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
