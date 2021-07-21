import React from 'react'
import { createUseStyles } from 'react-jss'
import { Navigation } from '~/common/components'
import { mergeClasses, useRouteStyles } from '~/common/styles'
import { getThemeKeys } from '~/theme'
import { ThemePicker } from './theme-picker'

const useStyles = createUseStyles({
  main: {
    maxWidth: '80vw',
    textAlign: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    columnGap: '1em',
    rowGap: '0.5em',
    '& label': {
      textAlign: 'left',
    },
  },
})

export const ThemeComponent: React.FC<{}> = () => {
  const styles = mergeClasses(useRouteStyles(), useStyles())
  return (
    <div className={styles.root}>
      <Navigation />
      <main className={styles.main}>
        {getThemeKeys().map((themeKey) => (
          <ThemePicker key={themeKey} themeKey={themeKey} />
        ))}
      </main>
    </div>
  )
}
