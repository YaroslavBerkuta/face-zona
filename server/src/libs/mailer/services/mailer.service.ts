import { Injectable } from '@nestjs/common'
import { MailerService as MailerLibService } from '@nestjs-modules/mailer'
import { IMailerService, ISendPayload } from '../typing'

@Injectable()
export class MailerService implements IMailerService {
	constructor(private readonly mailer: MailerLibService) {}

	public async send(options: ISendPayload) {
		try {
			await this.mailer.sendMail(options)
		} catch (e) {
			console.log('ERROR emailing', e)
		}
	}
}
