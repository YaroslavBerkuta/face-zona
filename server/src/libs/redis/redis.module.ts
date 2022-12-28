import { DynamicModule, Module } from '@nestjs/common'
import { provideClass } from 'src/shared'
import { REDIS_OPTIONS, REDIS_SERVICE } from './consts'
import { IRedisModuleOptions } from './interfaces'
import { RedisService } from './services'

@Module({})
export class RedisModule {
	static options: IRedisModuleOptions

	static getProviders() {
		return [
			provideClass(REDIS_SERVICE, RedisService),
			{ provide: REDIS_OPTIONS, useValue: this.options },
		]
	}

	static getExports() {
		return [REDIS_SERVICE]
	}

	static forRoot(options: IRedisModuleOptions): DynamicModule {
		RedisModule.options = options

		return {
			module: RedisModule,
			providers: RedisModule.getProviders(),
			exports: RedisModule.getExports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: RedisModule,
			providers: RedisModule.getProviders(),
			exports: RedisModule.getExports(),
		}
	}
}
