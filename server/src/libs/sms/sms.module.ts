import { DynamicModule, Module } from '@nestjs/common'
import { provideClass } from 'src/shared'
import { SMS_SERVICE } from './const'
import { ISmsModuleOptions } from './interfaces'
import { OneSignalSmsService } from './services/one-signal-sms.service'
import { TelegramSmsService } from './services/telegram-sms.service'

@Module({})
export class SmsModule {
	static options: ISmsModuleOptions

	static getExports() {
		return [SMS_SERVICE]
	}

	static forRoot(options: ISmsModuleOptions): DynamicModule {
		SmsModule.options = options

		return {
			module: SmsModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: SmsModule,
			providers: [
				provideClass(
					SMS_SERVICE,
					SmsModule.options.test ? TelegramSmsService : OneSignalSmsService,
				),
			],
			imports: [],
			exports: SmsModule.getExports(),
		}
	}
}
