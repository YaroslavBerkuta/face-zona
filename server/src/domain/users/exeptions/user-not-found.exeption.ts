import { Exeption } from 'src/shared'

export class UserNotFoundExeption extends Exeption {
	protected key = 'user-not-found'

	constructor() {
		super('User not found')
	}
}
