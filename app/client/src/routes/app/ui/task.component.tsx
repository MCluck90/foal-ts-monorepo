import React, { useState } from 'react'

export interface TodoProps {
  id: string
  text: string
  done: boolean
  onChange?: () => void
}

export const Task: React.FC<TodoProps> = ({ id, text, done, onChange }) => {
  const [isChecked, setIsChecked] = useState(done)
  const onCheck = (checked: boolean) => {
    setIsChecked(checked)
    fetch('/tasks', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, done: checked }),
    })
    onChange?.()
  }

  const onRemove = async () => {
    await fetch('/tasks', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    onChange?.()
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(evt) => onCheck(evt.currentTarget.checked)}
      />
      <span>{text}</span>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}
