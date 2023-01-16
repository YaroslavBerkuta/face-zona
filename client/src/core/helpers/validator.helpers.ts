import _ from 'lodash'

export const prepareValidatorResult = <T extends Record<string, any>>(
  result: T,
): Record<keyof T, string> => {
  if (_.isEmpty(result)) return null

  _.each(result, (it, key, arr: any) => {
    arr[key] = it[0]
  })

  return result
}
