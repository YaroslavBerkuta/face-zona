import { Exeption } from 'src/shared'

export class WrongRefreshTokenExeption extends Exeption {
	protected key = 'wrong-refresh-token'

	constructor() {
		super('Refresh token is wrong')
	}
}
