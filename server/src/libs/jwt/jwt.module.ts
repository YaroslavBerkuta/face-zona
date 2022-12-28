import { DynamicModule, Global, Module } from '@nestjs/common'
import { JWT_KEY, JWT_PAYLOAD_KEY } from './consts'
import { JwtModuleOptions } from './interfaces'
import { JwtService } from './services'

@Global()
@Module({})
export class JwtModule {
	static options: JwtModuleOptions

	static getProviders() {
		return [
			{
				provide: JWT_PAYLOAD_KEY,
				useValue: JwtModule.options.paylodKey,
			},
			{
				provide: JWT_KEY,
				useValue: JwtModule.options.jwtKey,
			},
			JwtService,
		]
	}

	static forRoot(options: JwtModuleOptions): DynamicModule {
		JwtModule.options = options

		return {
			module: JwtModule,
			providers: JwtModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: JwtModule,
			providers: JwtModule.getProviders(),
			exports: [JwtService],
		}
	}
}
