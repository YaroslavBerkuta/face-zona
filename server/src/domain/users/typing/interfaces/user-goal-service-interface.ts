import { IUserGoal } from './user.interface'

export interface IUserGoalService {
	store(payload: IUsersGoalPayload): Promise<IUserGoal>
	update(goals: IUsersGoalPayload): Promise<void>
}

export interface IUsersGoalPayload {
	alreadyRead?: boolean
}
