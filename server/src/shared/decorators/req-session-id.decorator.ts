import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ReqSessionId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	return request.sessionId || null
})
