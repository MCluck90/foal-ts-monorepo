import React from 'react'

export interface ErrorProps {
  error?: string
  onTryAgain?: () => unknown
}

export const Error: React.FC<ErrorProps> = ({ error, onTryAgain }) => {
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
