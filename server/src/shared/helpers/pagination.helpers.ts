import { ClassConstructor, plainToInstance } from 'class-transformer'
import { SelectQueryBuilder } from 'typeorm'
import { IPagination, IPaginationResult } from '../interfaces'

export const paginateAndGetMany = async <T>(
	oldQuery: SelectQueryBuilder<T>,
	pagination: IPagination,
	fieldPrefix = '',
): Promise<IPaginationResult<T>> => {
	let query = oldQuery.skip(pagination.skip).take(pagination.limit)

	if (pagination.sortField) {
		const sort: 'ASC' | 'DESC' = pagination.sort === 'ASC' ? 'ASC' : 'DESC'
		query = query.orderBy(fieldPrefix + '.' + pagination.sortField, sort)
	}

	const [items, count] = await query.getManyAndCount()
	return { items, count }
}

export const prepareSearchString = (searchString: string) => `%${searchString}%`

export const preapareItems = <T, K extends ClassConstructor<any>>(
	items: any[],
	count: number,
	dto: K,
): { items: T[]; count: number } => {
	return {
		items: items.map(it => plainToInstance(dto, it, { excludeExtraneousValues: true })),
		count,
	}
}
