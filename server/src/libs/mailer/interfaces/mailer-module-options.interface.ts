export interface IMailerModuleOptions {
	test: boolean
	smtp?: {
		domain?: string
		port?: number
		login?: string
		password?: string
		protocol?: string
		secure?: boolean
	}
	sendGrid?: {
		apiKey: string
	}
}
