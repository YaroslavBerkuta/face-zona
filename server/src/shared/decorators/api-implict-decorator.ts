import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

export function ApiImplictPagination(sortingFields?: string[]): MethodDecorator {
	return applyDecorators(
		ApiQuery({ name: 'limit', type: Number, required: false }),
		ApiQuery({ name: 'page', type: Number, required: false }),
		ApiQuery({
			name: 'sortField',
			type: String,
			required: false,
			enum: sortingFields,
		}),
		ApiQuery({
			name: 'sort',
			type: String,
			description: 'ASC | DESC',
			required: false,
		}),
		ApiQuery({ name: 'searchString', type: String, required: false }),
	)
}
