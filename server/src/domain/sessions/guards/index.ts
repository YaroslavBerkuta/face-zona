import { AuthGuard } from './auth.guard'
import { AuthRoleGuard } from './roles.guard'

export const SESSIONS_GUARDS = [AuthGuard, AuthRoleGuard]

export { AuthGuard, AuthRoleGuard }
