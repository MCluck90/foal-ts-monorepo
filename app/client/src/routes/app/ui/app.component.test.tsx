import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './app.component'

test('renders todo header', () => {
  render(<App />)
  const headerElement = screen.getByText(/todo/i)
  expect(headerElement).toBeInTheDocument()
})
