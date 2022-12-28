import { DynamicModule, Global, Module } from '@nestjs/common'
import { MailerModule as Mailer } from '@nestjs-modules/mailer'
import { provideClass } from 'src/shared'
import { IMailerModuleOptions } from './interfaces'
import { TelegramMailerService, MailerService } from './services'
import { MAILER_SERVICE } from './typing/consts'

@Module({})
export class MailerModule {
	static options: IMailerModuleOptions

	static getExports() {
		return [MAILER_SERVICE]
	}

	static getImports() {
		const { options } = MailerModule
		if (options.test) return []

		if (options.smtp) {
			return [
				Mailer.forRoot({
					transport: {
						port: options.smtp.port,
						host: `${options.smtp.domain}`,
						secure: options.smtp.secure,
						auth: {
							user: options.smtp.login,
							pass: options.smtp.password,
						},
					},
					defaults: {
						from: options.smtp.login,
					},
				}),
			]
		}

		// if (options.sendGrid) {
		// 	return [
		// 		SendGridModule.forRoot({
		// 			apiKey: options.sendGrid.apiKey,
		// 		}),
		// 	]
		// }
	}

	static forRoot(options: IMailerModuleOptions): DynamicModule {
		MailerModule.options = options

		return {
			module: MailerModule,
			imports: MailerModule.getImports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: MailerModule,
			providers: [provideClass(MAILER_SERVICE, MailerModule.getService())],
			imports: MailerModule.getImports(),
			exports: MailerModule.getExports(),
		}
	}

	static getService() {
		if (this.options.test) {
			return TelegramMailerService
		}
		if (this.options.smtp) {
			return MailerService
		}
		// if (this.options.sendGrid) {
		// 	return SendgridMailerService
		// }
	}
}
