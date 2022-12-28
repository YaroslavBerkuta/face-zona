import * as IORedis from 'ioredis'

export interface IRedisService {
	set(key: IORedis.KeyType, value: IORedis.ValueType, lifeTime?: number): Promise<void>
	get(key: IORedis.KeyType): Promise<any>
	del(key: IORedis.KeyType): Promise<void>
}
