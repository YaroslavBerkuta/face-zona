import { IsEmail } from 'class-validator'
import { UserRole } from 'src/domain/users/typing'
import { DtoProperty } from 'src/shared'

export class StoreUserPayloadDto {
	@DtoProperty()
	username: string

	@DtoProperty()
	@IsEmail()
	email: string

	@DtoProperty()
	fullName: string

	@DtoProperty()
	password: string

	@DtoProperty()
	role: UserRole
}
