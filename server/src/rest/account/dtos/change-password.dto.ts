import { DtoProperty } from 'src/shared'

export class ChangePasswordPayloadDto {
	@DtoProperty()
	password: string

	@DtoProperty()
	newPassword: string

	@DtoProperty()
	deviceName: string
}
