import { DynamicModule, Module } from '@nestjs/common'
import { UsersModule } from 'src/domain/users/users.module'
import { MailerModule } from 'src/libs/mailer/mailer.module'
import { RestUsersController } from './users.controller'
import { RestUsersService } from './users.service'

@Module({})
export class RestAdminUsersModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAdminUsersModule,
			controllers: [RestUsersController],
			providers: [RestUsersService],
			imports: [UsersModule.forFeature(), MailerModule.forFeature()],
		}
	}
}
