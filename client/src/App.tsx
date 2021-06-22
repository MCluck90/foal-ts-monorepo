import React, { useEffect, useState } from 'react'
import logo from '~/assets/logo.svg'
import '~/App.css'

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{text}</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
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

export default App
