import { DynamicModule, Global, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { provideClass } from 'src/shared'
import { SESSIONS_REPOSITORY, SESSIONS_SERVICE } from './consts'
import { Sessions } from './entities'
import { SESSIONS_GUARDS } from './guards'
import { SessionsService, SESSIONS_SERVICES } from './services'
import { RedisModule } from 'src/libs/redis'
import { JwtModule } from 'src/libs/jwt'

@Global()
@Module({})
export class SessionsModule {
	static getProviders() {
		return [
			provideEntity(SESSIONS_REPOSITORY, Sessions),
			provideClass(SESSIONS_SERVICE, SessionsService),
			...SESSIONS_SERVICES,
			...SESSIONS_GUARDS,
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: SessionsModule,
			imports: [JwtModule.forFeature(), RedisModule.forFeature()],
			providers: SessionsModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: SessionsModule,
			imports: [JwtModule.forFeature(), RedisModule.forFeature()],
			providers: SessionsModule.getProviders(),
			exports: [SESSIONS_SERVICE],
		}
	}
}
