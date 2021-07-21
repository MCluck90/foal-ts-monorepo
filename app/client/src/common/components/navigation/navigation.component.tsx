import { createUseStyles } from 'react-jss'
import { NavLink } from 'react-router-dom'
import { Theme } from '~/theme'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    backgroundColor: Theme.NavigationBackgroundColor,
    padding: '1em 2em',
    marginBottom: '2em',
    '& > a': {
      opacity: 0.8,
      marginRight: '1em',
    },
    '& > $activeLink': {
      opacity: 1,
      fontWeight: 'bold',
    },
  },
  activeLink: {},
})

export const Navigation = () => {
  const styles = useStyles()
  return (
    <nav className={styles.root}>
      <NavLink to="/" exact activeClassName={styles.activeLink}>
        Todos
      </NavLink>
      <NavLink to="/theme" activeClassName={styles.activeLink}>
        Theme
      </NavLink>
    </nav>
  )
}
