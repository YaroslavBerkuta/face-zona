import { Inject, Injectable } from '@nestjs/common'
import * as IORedis from 'ioredis'
import { REDIS_OPTIONS } from '../consts'
import { IRedisModuleOptions, IRedisService } from '../interfaces'

@Injectable()
export class RedisService implements IRedisService {
	private client: IORedis.Redis

	constructor(@Inject(REDIS_OPTIONS) options: IRedisModuleOptions) {
		this.client = new IORedis(options)
	}

	async set(key: IORedis.KeyType, value: IORedis.ValueType, lifeTime?: number) {
		if (lifeTime) await this.client.set(key, value, 'ex', lifeTime)
		else await this.client.set(key, value)
	}

	async get(key: IORedis.KeyType) {
		return await this.client.get(key)
	}

	async del(key: IORedis.KeyType) {
		await this.client.del(key)
	}
}
