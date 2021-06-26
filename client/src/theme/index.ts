export enum Theme {
  Background = 'var(--app-background)',
  Text = 'var(--app-text)',
}

const defaultValues: Record<Theme, string> = {
  [Theme.Background]: '#222',
  [Theme.Text]: '#eee',
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
