import React from 'react'
import { getThemeKeys } from '~/theme'
import { ThemePicker } from './theme-picker.component'

export const ThemeChanger: React.FC = () => (
  <div>
    {getThemeKeys().map((themeKey) => (
      <ThemePicker key={themeKey} themeKey={themeKey} />
    ))}
  </div>
)
