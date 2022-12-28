import { DtoProperty } from 'src/shared'

export class RefreshSessionPayloadDto {
	@DtoProperty()
	refreshToken: string
}
