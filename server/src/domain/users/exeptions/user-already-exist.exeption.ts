import { Exeption } from 'src/shared'

export class UserAlreadyExistExeption extends Exeption {
	protected key = 'user-already-exist'

	constructor() {
		super('User already exist')
	}
}
