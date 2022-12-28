import { UseGuards } from '@nestjs/common'
import { AuthGuard as Guard } from '../guards'

export const AuthGuard = () => UseGuards(Guard)
