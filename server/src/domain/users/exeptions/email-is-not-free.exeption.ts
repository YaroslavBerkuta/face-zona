import { Exeption } from 'src/shared'

export class EmailIsNotFreeExeption extends Exeption {
	protected key = 'email-is-not-free'

	constructor() {
		super('Email is not free')
	}
}
