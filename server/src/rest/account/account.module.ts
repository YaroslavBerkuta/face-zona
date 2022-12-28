import { DynamicModule, Module } from '@nestjs/common'
import { UsersModule } from 'src/domain/users/users.module'
import { AccountController } from './account.controller'
import { RestAccountService } from './account.service'

@Module({})
export class RestAccountModule {
	static forRoot(): DynamicModule {
		return {
			module: RestAccountModule,
			imports: [UsersModule.forFeature()],
			controllers: [AccountController],
			providers: [RestAccountService],
		}
	}
}
