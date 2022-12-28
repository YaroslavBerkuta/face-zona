import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthRoleGuard, AuthGuard } from '../guards'

export const RoleGuard = (...roles: string[]) =>
	applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard, AuthRoleGuard))
