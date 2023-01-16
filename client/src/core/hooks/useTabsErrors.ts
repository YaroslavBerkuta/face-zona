import _ from 'lodash'
import { useMemo } from 'react'

type Errors = Record<string, string>

export const useTabsErrors = (errors: Errors) => {
  return useMemo(() => {
    const result = {
      baseInfo: false,
      translates: false,
    }
    const _errors = _.clone(errors)

    if (_errors.translates) result.translates = true
    delete _errors.translates

    Object.keys(_errors).map((key) => {
      if (key.includes('translates')) result.translates = true
      delete _errors[key]
    })

    console.log(_errors, result)

    if (!_.isEmpty(_.omitBy(_errors, _.isNil))) result.baseInfo = true
    return result
  }, [errors])
}
