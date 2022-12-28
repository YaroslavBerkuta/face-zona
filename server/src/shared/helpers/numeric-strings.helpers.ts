const everythingExceptDigitsPattern = /\D/g

export const getNumericString = (s: string) => s.replace(everythingExceptDigitsPattern, '')
