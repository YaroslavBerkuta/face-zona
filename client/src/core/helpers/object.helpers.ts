import { compareArrays } from './array.helpers'

export const clearNotChangedProps = (
  exitsObj: Record<any, any>,
  changedObj: Record<any, any>,
): Record<any, any> => {
  const resObj: Record<any, any> = {}
  let hasOne = false

  Object.keys(changedObj).map((key: string) => {
    if (changedObj[key] && exitsObj[key] !== changedObj[key]) {
      hasOne = true
      resObj[key] = changedObj[key]
    }
  })

  return hasOne ? resObj : null
}

export const getOrDef = <T>(get: T, def: T) => {
  return get ? get : def
}
