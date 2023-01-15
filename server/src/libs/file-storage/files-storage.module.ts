import { DynamicModule, Module } from '@nestjs/common'
import { FILE_STORAGE_OPTIONS } from './consts'
import { IFilesStorageOptions } from './interfaces'
import { FileStorageService } from './services'

@Module({})
export class FilesStorageModule {
	static options: IFilesStorageOptions

	static getProviders() {
		return [
			{
				provide: FILE_STORAGE_OPTIONS,
				useValue: FilesStorageModule.options,
			},
			FileStorageService,
		]
	}

	static getExports() {
		return [FileStorageService]
	}

	static forFeature(): DynamicModule {
		return {
			module: FilesStorageModule,
			providers: FilesStorageModule.getProviders(),
			exports: FilesStorageModule.getExports(),
		}
	}

	static forRoot(options: IFilesStorageOptions): DynamicModule {
		FilesStorageModule.options = options

		return {
			module: FilesStorageModule,
			providers: FilesStorageModule.getProviders(),
			exports: FilesStorageModule.getExports(),
		}
	}
}
