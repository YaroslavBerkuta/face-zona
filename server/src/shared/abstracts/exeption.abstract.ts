export abstract class Exeption extends Error {
	protected abstract key: string

	constructor(public message: string) {
		super(message)
	}

	public getParams() {
		return { key: this.key, description: this.message }
	}
}
