import { ConnectionOptions } from 'typeorm'

export interface IDatabaseAsyncModuleParams {
	imports?: any[]
	useFactory: (...args: any[]) => Promise<Partial<ConnectionOptions>>
	inject: any[]
}
