import * as moment from 'moment'

/**
 * Функція для обчислення порядкового номера дня року
 * @param {string | Date} date - дата для обчислення; якщо відсутня, то обчислюється для поточної дати
 * @param {number} daysInterval - інтервал в днях; вказується, якщо потрібно обчислити день року
 * через вказану кількість днів від переданої або поточної дати
 * @returns Повертає порядковий номер дня у році
 */

export const getDayOfYear = (date: Date | string = new Date(), daysInterval = 0): number => {
	const currDate = new Date(date)
	currDate.setDate(currDate.getDate() + daysInterval)
	const startOfYear = new Date(currDate.getFullYear(), 0, 0)
	const diff = Number(currDate) - Number(startOfYear)
	const oneDay = 1000 * 60 * 60 * 24
	const day = Math.floor(diff / oneDay)

	return day
}

export const getNowUTCDefault = () => {
	var date = new Date()
	var now_utc = Date.UTC(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
	)
	return now_utc
}

export const dateToSqlFormat = data => moment(data).format('YYYY-MM-DD')

export const getHoursToEndDay = () => {
	const now = moment()
	const end = now.endOf('day').valueOf()
	return moment.duration(end - now.valueOf()).hours()
}

export const getStartDay = (date: Date) => {
	date.setHours(0)
	date.setMinutes(0)
	date.setSeconds(0)
	return date
}
