import { Logger, OnModuleInit } from '@nestjs/common'
import { getEnv, stringToBoolean } from '../helpers'

const AUTO_SEED_ENABLED = stringToBoolean(getEnv('AUTO_SEED_ENABLED'))

export abstract class Seeder implements OnModuleInit {
	protected abstract name: string
	protected abstract seed(): void | Promise<void>

	private logger: Logger

	private async run() {
		try {
			await this.seed()
		} catch (e) {
			this.logger.warn(e)
		}
	}

	public onModuleInit() {
		this.logger = new Logger(this.name)
		if (AUTO_SEED_ENABLED) {
			this.run()
		}
	}
}
