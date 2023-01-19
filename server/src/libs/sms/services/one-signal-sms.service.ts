import { Injectable, NotImplementedException } from '@nestjs/common'
import { ISendPayload, ISmsService } from '../interfaces'

@Injectable()
export class OneSignalSmsService implements ISmsService {
	public async send(options: ISendPayload) {
		throw new NotImplementedException()
	}
}
