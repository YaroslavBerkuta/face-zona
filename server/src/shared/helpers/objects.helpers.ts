export const removeObjectNullableFields = (obj: { [key: string]: any }) => {
	const keys = Object.keys(obj)
	keys.forEach(it => {
		if (!obj[it] && obj[it] !== 0) delete obj[it]
	})

	return obj
}
