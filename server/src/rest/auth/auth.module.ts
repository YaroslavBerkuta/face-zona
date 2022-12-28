import { DynamicModule, Module } from '@nestjs/common'
import { SessionsModule } from 'src/domain/sessions/sessions.module'
import { UsersModule } from 'src/domain/users/users.module'
import { ConfirmationCodesModule } from 'src/domain/confirmation-codes/confirmation-codes.module'
import { RestAuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { RedisModule } from 'src/libs/redis'
import { MailerModule } from 'src/libs/mailer/mailer.module'

@Module({})
export class RestAuthModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAuthModule,
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				MailerModule.forFeature(),
				ConfirmationCodesModule.forFeature(),
				RedisModule.forFeature(),
			],
			controllers: [AuthController],
			providers: [RestAuthService],
		}
	}
}
