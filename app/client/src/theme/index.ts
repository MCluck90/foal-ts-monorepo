/**
 * Themable values
 */
export enum Theme {
  BackgroundColor = 'var(--app-background-color)',
  PrimaryFont = 'var(--app-primary-font)',
  TextColor = 'var(--app-text-color)',
}

const storageKey = '--app-theme'

const isTheme = (str: string): str is Theme =>
  Object.values(Theme).some((value) => value === str)

// Done in a record to guarantee that all values are captured
const defaultValuesRecord: Record<Theme, string> = {
  [Theme.BackgroundColor]: '#222',
  [Theme.PrimaryFont]: 'Arial, Helvetica, sans-serif',
  [Theme.TextColor]: '#eee',
}

const defaultValues: Map<Theme, string> = new Map(
  Object.keys(defaultValuesRecord)
    .filter(isTheme)
    .map((key) => [key, defaultValuesRecord[key]]),
)

/**
 * Convert a `Theme` key to a property name
 *
 * ```ts
 * keyToPropertyName(Theme.PrimaryFont) === '--app-primary-font'
 * ```
 */
const keyToPropertyName = (key: Theme): string =>
  key.slice('var('.length, key.length - 1)

/**
 * Convert a property name to a `Theme` key
 *
 * ```ts
 * propertyNameToKey('--app-primary-font') === Theme.PrimaryFont
 * ```
 */
const propertyNameToKey = (propertyName: string): Theme =>
  `var(${propertyName})` as Theme

/**
 * Extract theme from local storage
 */
const getThemeFromStorage = (): Map<Theme, string> | null => {
  const themeJson = localStorage.getItem(storageKey)
  if (!themeJson) {
    return null
  }

  const serializedTheme = JSON.parse(themeJson)
  return new Map(
    Object.keys(serializedTheme).reduce((theme, propertyName) => {
      const key = propertyNameToKey(propertyName)
      theme.push([key, serializedTheme[propertyName]])
      return theme
    }, [] as [Theme, string][]),
  )
}

/**
 * Save theme to local storage
 */
const saveThemeToStorage = (theme: Map<Theme, string>) => {
  const serialized = Array.from(theme.entries()).reduce((acc, [key, value]) => {
    acc[keyToPropertyName(key)] = value
    return acc
  }, {} as Record<string, string>)
  localStorage.setItem(storageKey, JSON.stringify(serialized))
}

/**
 * Set the value for a part of the theme
 */
export const setThemeValue = (themeKey: Theme, value: string) => {
  document.body.style.setProperty(keyToPropertyName(themeKey), value)

  const theme = getThemeFromStorage()
  if (!theme) {
    return
  }

  theme.set(themeKey, value)
  saveThemeToStorage(theme)
}

/**
 * Apply theme from storage
 */
const loadTheme = () => {
  const theme = getThemeFromStorage()
  if (!theme) {
    saveThemeToStorage(defaultValues)
    return
  }

  for (const [key, value] of Array.from(theme.entries())) {
    setThemeValue(key, value)
  }
}

/**
 * Load and apply theme theme
 */
export const initializeTheme = () => {
  const customProperties = Array.from(defaultValues.entries()).map(
    ([reference, defaultValue]) =>
      `${keyToPropertyName(reference)}: ${defaultValue}`,
  )

  const themeStyleSheet = document.createElement('style')
  themeStyleSheet.innerHTML = `:root{${customProperties.join(';')}}`
  document.head.appendChild(themeStyleSheet)
  loadTheme()
}
