import React, { useState } from 'react'
import {
  themeKeyToName,
  getThemeValue,
  resetThemeValue,
  setThemeValue,
  Theme,
} from '~/theme'

export interface ThemePickerProps {
  themeKey: Theme
}

const themeValueToInputType: Record<Theme, 'color' | 'text'> = {
  [Theme.BackgroundColor]: 'color',
  [Theme.PrimaryFont]: 'text',
  [Theme.TextColor]: 'color',
  [Theme.HeaderTextColor]: 'color',
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ themeKey }) => {
  const name = themeKeyToName(themeKey)
  const [value, setValue] = useState(getThemeValue(themeKey))
  const onInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.currentTarget.value
    setValue(newValue)
    setThemeValue(themeKey, newValue)
  }
  const onReset = () => {
    setValue(resetThemeValue(themeKey))
  }
  return (
    <div>
      <label>{name}</label>
      <input
        type={themeValueToInputType[themeKey]}
        value={value}
        onInput={onInput}
      />
      <button onClick={onReset}>Reset</button>
    </div>
  )
}
