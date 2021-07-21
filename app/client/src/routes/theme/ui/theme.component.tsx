import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import { mergeClasses, useRouteStyles } from '~/common/styles'
import { getThemeKeys } from '~/theme'
import { ThemePicker } from './theme-picker'

const useStyles = createUseStyles({})

export const ThemeComponent: React.FC<{}> = () => {
  const styles = mergeClasses(useRouteStyles(), useStyles())
  return (
    <div className={styles.root}>
      <Link to="/">Todos</Link>
      <main className={styles.main}>
        {getThemeKeys().map((themeKey) => (
          <ThemePicker key={themeKey} themeKey={themeKey} />
        ))}
      </main>
    </div>
  )
}
