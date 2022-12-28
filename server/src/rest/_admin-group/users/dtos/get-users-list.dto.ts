import { Type } from 'class-transformer'
import { UserDto } from 'src/domain/users/typing'
import { DtoProperty } from 'src/shared'

export class GetUsersListResponseDto {
	@Type(() => UserDto)
	@DtoProperty({ isArray: true, type: UserDto })
	items: UserDto

	@DtoProperty()
	count: number
}
