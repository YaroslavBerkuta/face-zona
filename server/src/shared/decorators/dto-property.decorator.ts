import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

export function DtoProperty(options?: ApiPropertyOptions) {
	return applyDecorators(ApiProperty(options), Expose(), IsNotEmpty())
}

export function DtoPropertyOptional(options?: ApiPropertyOptions) {
	return applyDecorators(ApiPropertyOptional(options), Expose(), IsOptional())
}
