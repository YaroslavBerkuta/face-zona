import { AxiosError, AxiosResponse } from 'axios'

export const isApiError = (e: any): boolean => {
  try {
    return Boolean(e.response.data.key)
  } catch (e) {
    return false
  }
}

export const isErrorStatus = (res: AxiosError, status: number) => {
  try {
    return res.response.status === status
  } catch (e) {
    return false
  }
}

export const getDataFromApiError = (e: AxiosError) => {
  try {
    return e.response.data
  } catch (e) {
    return null
  }
}

export const isReqError = (e: any) => {
  try {
    return e && e.response && e.response.status
  } catch (e) {
    return false
  }
}
export const convertToFormData = (form: Record<string, any>) => {
  const formData = new FormData()

  Object.keys(form).map((key) => {
    if (Array.isArray(form[key])) {
      form[key].map((it: any, i: number) => {
        if (typeof it == 'object') {
          formData.append(`${key}[${i}]`, JSON.stringify(it))
        } else formData.append(`${key}[${i}]`, it)
      })
    } else formData.append(key, form[key])
  })

  return formData
}

const appendToFormDate = (formData: FormData, obj: any, startKey?: string) => {
  if (startKey === 'image') formData.append(startKey, obj)
  else if (Array.isArray(obj)) {
    obj.map((it: any, i: number) => appendToFormDate(formData, it, `${startKey}[${i}]`))
  } else if (typeof obj === 'object') {
    Object.keys(obj).map((key) => {
      formData.append(`${startKey}.${key}`, obj[key])
    })
  } else formData.append(startKey, obj)
}
