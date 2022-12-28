/**
 * Функція для фільтрації масива чисел від дублів та переданого значення
 * @param {number[]} array - масив
 * @param {number} excludeValue - значення, яке потрібно виключити з масива
 * @returns Повертає відфільтрований масив
 */

export const filterFromRepeatsAndValue = (array: number[], excludeValue?: number) => {
	const filteredArray: number[] = []
	array.map(id => {
		if (id !== excludeValue && !filteredArray.includes(id)) filteredArray.push(id)
	})

	return filteredArray
}
