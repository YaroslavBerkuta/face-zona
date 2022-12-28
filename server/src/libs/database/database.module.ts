import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionOptions } from 'typeorm'

@Global()
@Module({})
export class DatabaseModule {
	static forRoot(options: Partial<ConnectionOptions>, entities: any[]): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [TypeOrmModule.forRoot({ ...options, entities })],
		}
	}
}
