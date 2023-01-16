export const getSafeArray = <T>(arr: T[]): T[] => {
  return Array.isArray(arr) ? arr : []
}

export const isNotEmptyArray = (arr: unknown[]): boolean => {
  return Boolean(Array.isArray(arr) && arr.length)
}

export const addUniqueItemToArray = <T>(arr: T[], item: T): T[] => {
  const result = [...arr]

  if (!result.includes(item)) result.push(item)

  return result
}

export const toggleItemInArray = <T>(arr: T[], item: T): T[] => {
  if (!arr.includes(item)) return [...arr, item]
  else return removeItemFromArray(arr, item)
}

export const removeItemFromArray = <T>(arr: T[], item: T): T[] => {
  return arr.filter((it) => it !== item)
}
export const removeItemsFromArray = <T>(arr: T[], items: T[]): T[] => {
  return arr.filter((it) => !items.includes(it))
}

export const enumToArray = (val: any) => {
  return Object.keys(val).map((key) => val[key])
}

export const arrayToKeyValueArray = <T>(arr: T[]) => {
  return arr.map((it) => {
    return {
      value: it,
      label: it,
    }
  })
}

export const enumToKeyValueArray = (val: any) => {
  return arrayToKeyValueArray(enumToArray(val)).sort((a: any, b: any) => {
    if (a.label > b.label) return 1
    if (a.label < b.label) return -1
    return 0
  })
}

export const compareArrays = (a1: any[], a2: any[]) => {
  return a1.filter((i) => !a2.includes(i)).concat(a2.filter((i) => !a1.includes(i)))
}

export const addKeyToArray = <T extends { id?: number }>(items: T[]) => {
  return items.map((it) => ({
    ...it,
    key: it.id,
  }))
}
