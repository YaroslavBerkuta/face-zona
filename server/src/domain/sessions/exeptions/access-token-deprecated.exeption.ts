import { Exeption } from 'src/shared'

export class AccessTokenDeprecated extends Exeption {
	protected key = 'access-token-deprecated'

	constructor() {
		super('Access token deprecated')
	}
}
