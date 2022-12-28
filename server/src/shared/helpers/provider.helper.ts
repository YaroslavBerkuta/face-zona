export const provideClass = (name: symbol, value: any) => ({
	provide: name,
	useClass: value,
})
