import { DtoProperty } from 'src/shared'
import { UserRole, UserStatus } from '../enums'

export class UserDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	phoneNumber: string

	@DtoProperty()
	mail: string

	@DtoProperty()
	fullName: string

	@DtoProperty()
	lastName: string

	@DtoProperty()
	description: string

	@DtoProperty()
	alreadyRead: boolean

	@DtoProperty({ enum: UserRole })
	role: UserRole

	@DtoProperty({ enum: UserStatus })
	status: UserStatus

	@DtoProperty()
	createdAt: string

	@DtoProperty()
	updatedAt: string
}

export class UsersGoalDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	userId: number

	@DtoProperty()
	goalId: number

	@DtoProperty()
	createdAt: string

	@DtoProperty()
	updatedAt: string
}
