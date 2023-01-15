import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
	Inject,
} from '@nestjs/common'
import { Client, CopyConditions } from 'minio'
import { UPLOAD_IMAGE_FILE_TYPES } from 'src/shared/consts'
import { FilesStorage } from 'src/shared/namespace'
import { FILE_STORAGE_OPTIONS } from '../consts'
import { IFilesStorageOptions, IInputFile } from '../interfaces'

@Injectable()
export class FileStorageService implements FilesStorage.IFilesStorageService {
	private minioClient: Client
	private bucket = 'files'
	private privateBucket: string
	private urlPrefix: string
	private isAwsStorage = false

	constructor(@Inject(FILE_STORAGE_OPTIONS) options: IFilesStorageOptions) {
		const params: any = {
			endPoint: options.host,
			useSSL: String(options.useSSL) === 'true' ? true : false,
			accessKey: options.accessKey,
			secretKey: options.secretKey,
			region: options.region,
		}

		const port = Number(options.port)
		if (port) params.port = port

		if (params.region) this.isAwsStorage = true
		if (options.bucket) this.bucket = options.bucket

		this.urlPrefix = options.urlPrefix
		this.minioClient = new Client(params)
	}

	/**
	 * Формування повної адреси даного файла
	 * @param {string} folder - адреса папки, що містить файл
	 * @param {string} file - адреса файла
	 * @returns Повертає повну адресу файла
	 */
	private createFullFilePath(folder: string, file: string): string {
		return `${this.bucket}/${folder}/${file}`
	}

	async putObject(file: IInputFile, folderPath = 'images'): Promise<string> {
		return new Promise((resolve, reject) => {
			const folder = `${folderPath}/${new Date().getFullYear()}/${new Date().getMonth()}`
			const fileName = `${new Date().getTime()}.${file.originalname.replace(/ /g, '_')}`

			const metaData = { 'Content-Type': 'application/octet-stream' }

			this.minioClient.putObject(
				this.bucket,
				`${folder}/${fileName}`,
				file.buffer,
				null,
				metaData,
				(err, etag) => {
					if (err) {
						return reject(err)
					}
					resolve(this.createFullFilePath(folder, fileName))
				},
			)
		})
	}

	async copyObject(fileUrl: string, folderPath = 'images') {
		const name = this.extractOriginalName(fileUrl)
		const folder = `${folderPath}/${new Date().getFullYear()}/${new Date().getMonth()}`
		const fileName = `${new Date().getTime()}.${name.replace(/ /g, '_')}`
		const conditions = new CopyConditions()

		await this.minioClient.copyObject(this.bucket, `${folder}/${fileName}`, fileUrl, conditions)
		return this.createFullFilePath(folder, fileName)
	}

	extractOriginalName(fileUrl: string) {
		const attributes = fileUrl.split('/')
		const name = attributes[attributes.length - 1]
		const nameArr = name.split('.')
		const originalName = nameArr.slice(1)
		return originalName.join('.')
	}

	async safePutObject(file: IInputFile, folderPath): Promise<string> {
		let path = null
		if (UPLOAD_IMAGE_FILE_TYPES.includes(file.mimetype)) path = `${folderPath}`
		else path = `other/${folderPath}`

		return await this.putObject(file, path)
	}

	async removeObject(url: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.minioClient.removeObject(this.bucket, this.getKeyFromUrl(url), err => {
				console.log(err)
				if (err) return reject(false)
				else return resolve(true)
			})
		})
	}

	async removeObjects(urls: string[]): Promise<void> {
		urls = urls.map(item => this.getKeyFromUrl(item))
		return new Promise((resolve, reject) =>
			this.minioClient.removeObjects(this.bucket, urls, err => {
				if (err) return reject()
				else return resolve()
			}),
		)
	}

	async replaceObject(url: string, file: any, folderPath = 'images'): Promise<string> {
		if (await this.removeObject(url)) return await this.putObject(file, folderPath)
		else throw new InternalServerErrorException('Failed to remove file')
	}

	async saveWithTypeCheck(
		file: IInputFile,
		allowedTypes: string[],
		path?: string,
	): Promise<string> {
		if (!file || !file.mimetype) {
			throw new BadRequestException('File is required')
		} else if (!allowedTypes.includes(file.mimetype)) {
			throw new BadRequestException('File type is allowed')
		}
		return await this.putObject(file, path)
	}

	/**
	 * Отримання назви файлу з його повної адреси
	 * @param {string} url - повна адреса файлу
	 * @returns Повертає назву файлу
	 */
	private getKeyFromUrl(url: string) {
		const toReplace = this.isAwsStorage
			? `${this.urlPrefix}/${this.bucket}/`
			: `${this.urlPrefix}/${this.bucket}`
		return url.replace(toReplace, '')
	}

	// **********  PRIVATE BUCKET ********** //
	async putToPrivateBucket(file: IInputFile, folderPath: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const fileName = `${file.originalname.replace(/ /g, '_')}`
			const metaData = { 'Content-Type': 'text/plain' }

			this.minioClient.putObject(
				this.privateBucket,
				`${folderPath}/${fileName}`,
				file.buffer,
				null,
				metaData,
				(err, etag) => {
					if (err) {
						console.log('Error on save to private bucket', err)
						return reject()
					}
					// resolve(this.createFullFilePath(folderPath, fileName))
					resolve()
				},
			)
		})
	}

	async getFromPrivateBucket(name: string, folderPath: string) {
		return new Promise((resolve, reject) => {
			const fileName = `${name.replace(/ /g, '_')}`

			return this.minioClient.getObject(
				this.privateBucket,
				`${folderPath}/${fileName}`,
				(err, res) => {
					if (err) {
						console.log('error on resp', err)
						reject(err)
					}
					res.on('data', chunk => resolve(chunk))
				},
			)
		})
	}

	async getPresignedUrlForPutObject(folderPath: string = 'images', filename: string) {
		const folder = `${folderPath}/${new Date().getFullYear()}/${new Date().getMonth()}`
		const fileName = `${new Date().getTime()}.${filename.replace(/ /g, '_')}`
		const presignedUrl = await this.minioClient.presignedPutObject(
			this.bucket,
			`${folder}/${fileName}`,
		)
		return { presignedUrl, resultUrl: this.createFullFilePath(folder, fileName) }
	}
}
