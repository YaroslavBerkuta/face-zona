export interface ICreateTokenPayload {
	id: number | string
	expiresIn?: string
	role?: string
	sessionId?: number
}
