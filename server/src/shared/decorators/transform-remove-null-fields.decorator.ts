import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { removeObjectNullableFields } from '../helpers'

export const TransformRemoveNullubleFields = () =>
	applyDecorators(Transform(value => removeObjectNullableFields(value.value)))
