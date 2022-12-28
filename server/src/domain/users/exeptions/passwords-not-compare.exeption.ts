import { Exeption } from 'src/shared'

export class PasswordsNotCompareExeption extends Exeption {
	protected key = 'passwordsNotCompare'

	constructor() {
		super('Password not compare')
	}
}
