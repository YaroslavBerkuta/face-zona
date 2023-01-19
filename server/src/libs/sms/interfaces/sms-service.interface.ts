export interface ISendPayload {
	to: string
	text: string
	from?: string
}

export interface ISmsService {
	send(payload: ISendPayload): Promise<void>
}
