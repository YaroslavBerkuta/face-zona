import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { stringToBoolean } from '../helpers'

export const TransformStringToBoolean = () =>
	applyDecorators(Transform(value => stringToBoolean(value.value)))
