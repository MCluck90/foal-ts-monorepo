export const hasOwnProperty = <TKey extends string = string, TItem = unknown>(
  item: TItem,
  property: TKey,
): item is typeof item & Record<TKey, unknown> => {
  return property in item
}
