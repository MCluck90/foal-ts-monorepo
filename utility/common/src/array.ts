import { Lazy } from 'fp-ts/function'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { Nullish } from './types'

/**
 * Get the first item in an array.
 * Returns null if the array is non-existent or empty.
 */
export const firstOrNull = <T>(items: Nullish<T[]>) =>
  items && items.length > 0 ? items[0] : null

/**
 * Get the first item in an array.
 * Returns a default value if the array is non-existent or empty.
 */
export const firstOrDefault = <T, U>(
  items: Nullish<T[]>,
  defaultValue: Lazy<U>,
) => (items && items.length > 0 ? items[0] : defaultValue())

/**
 * Determine if an array is non-empty.
 */
export const isNotEmpty = <T>(arr: T[]): arr is NonEmptyArray<T> =>
  arr.length > 0
