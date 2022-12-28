export const removeBearerFromToken = (token: string) => (token ? token.replace('Bearer ', '') : '')
