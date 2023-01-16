import moment from 'moment'

export const dateFormat = (date: string, format = 'DD.MM.YYYY'): string => {
  if (!date) return '-'
  return moment(new Date(date)).format(format)
}

export const timeFormat = (date: string): string => {
  if (!date) return '-'
  return moment(new Date(date)).format('HH:mm')
}
