import { DtoProperty, DtoPropertyOptional } from 'src/shared'
import { ISession } from '../interfaces'

export class SessionDto implements ISession {
	@DtoPropertyOptional()
	id?: number

	@DtoProperty()
	accessToken: string

	@DtoProperty()
	refreshToken: string

	@DtoPropertyOptional()
	userId: number

	@DtoPropertyOptional()
	deviceName?: string

	@DtoPropertyOptional()
	createdAt?: string
}
