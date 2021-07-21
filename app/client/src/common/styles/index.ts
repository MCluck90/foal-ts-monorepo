/**
 * Merge objects containing CSS classes, such as what comes from `react-jss`.
 */
export function mergeClasses<T extends any[]>(...objects: T) {
  const allKeys = objects.reduce<string[]>((keys, obj) => {
    const keysInObject = Object.keys(obj || {})
    return [...keys, ...keysInObject]
  }, [])

  const allClasses = Array.from(new Set(allKeys))
  return allClasses.reduce((result, className) => {
    result[className] = objects.reduce((combinedClassName, obj = {}) => {
      const objClassName = obj[className] ? `${obj[className]}` : ''
      return `${combinedClassName} ${objClassName}`.replace(/\s+/g, ' ').trim()
    }, '')
    return result
  }, {} as Record<string, string>)
}

export * from './route.styles'
