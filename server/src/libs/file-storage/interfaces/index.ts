export * from "./input-file.interface";
export interface IFilesStorageOptions {
	host: string
	accessKey: string
	secretKey: string
	port: number
	urlPrefix: string

	useSSL?: boolean
	bucket?: string
	privateBucket?: string
	region?: string
}