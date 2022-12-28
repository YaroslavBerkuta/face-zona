import { Repository } from 'typeorm'
import { IUser, IUserGoal } from './user.interface'

export type IUsersRepository = Repository<IUser>
export type IUserGoalRepository = Repository<IUserGoal>
