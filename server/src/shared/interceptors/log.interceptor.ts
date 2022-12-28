import { Injectable } from '@nestjs/common'

@Injectable()
export class LoggingInterceptor {
	intercept(context: any, next: any): any {
		return next.handle()
	}
}
