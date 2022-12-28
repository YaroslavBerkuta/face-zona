import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	return request.userId || null
})

export const ReqToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	return request.token || null
})
