export interface TokensPair {
    accessToken: string 
    refreshToken: string 
}

export interface ISession extends TokensPair {
    id?: number 
    userId?: number
    createdAt?: number
}