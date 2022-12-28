import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'

export const TransformStringToNumber = () =>
	applyDecorators(Transform(value => Number(value.value)))
