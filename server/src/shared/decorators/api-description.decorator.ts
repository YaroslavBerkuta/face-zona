import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

export function ApiDescription(description: string, result: string) {
	return applyDecorators(
		ApiOperation({ summary: description }),
		ApiResponse({
			status: 200,
			description: result,
		}),
	)
}
