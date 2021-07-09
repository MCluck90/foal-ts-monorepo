export enum Theme {
  BackgroundColor = 'var(--app-background-color)',
  PrimaryFont = 'var(--app-primary-font)',
  TextColor = 'var(--app-text-color)',
}

const defaultValues: Record<Theme, string> = {
  [Theme.BackgroundColor]: '#222',
  [Theme.PrimaryFont]: 'Arial, Helvetica, sans-serif',
  [Theme.TextColor]: '#eee',
}

const getPropertyName = (propertyReference: string): string =>
  propertyReference.slice('var('.length, propertyReference.length - 1)

export const setThemeValue = (themeKey: Theme, value: string) => {
  document.body.style.setProperty(getPropertyName(themeKey), value)
}

const customProperties = Object.entries(defaultValues).map(
  ([reference, defaultValue]) =>
    `${getPropertyName(reference)}: ${defaultValue}`,
)

export const defaultStyleSheet = document.createElement('style')
defaultStyleSheet.innerHTML = `:root{${customProperties.join(';')}}`
