import { createUseStyles, Styles } from 'react-jss'

type MergedClasses<T extends any[]> = {
  [Index in keyof T]: Extract<keyof Exclude<T[Index], undefined>, string>
}[number]

/**
 * Merge objects containing CSS classes, such as what comes from `react-jss`.
 */
export function mergeClasses<T extends any[]>(...objects: T) {
  const allKeys = objects.reduce<string[]>((keys, obj = {}) => {
    const objKeys = Object.keys(obj || {})
    return [...keys, ...objKeys]
  }, [])
  const allClasses = Array.from(new Set(allKeys))
  return allClasses.reduce<Record<string, string>>((result, className) => {
    result[className] = objects.reduce((combinedClassName, obj = {}) => {
      const objClassName = obj[className] ? ` ${obj[className]}` : ''
      return `${combinedClassName}${objClassName}`.replace(/\s+/g, ' ').trim()
    }, '')
    return result
  }, {}) as Record<MergedClasses<T>, string>
}

/**
 * A typesafe version of `createUseStyles`.
 */
export function createStyles<T extends Styles>(
  styles: T,
): () => Record<keyof T, string> {
  return createUseStyles(styles) as () => Record<keyof T, string>
}
