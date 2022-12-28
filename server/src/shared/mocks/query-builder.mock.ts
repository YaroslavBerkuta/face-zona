import { jest } from '@jest/globals'
export const QueryBuilderMethodsMock = {
	offset: jest.fn(() => QueryBuilderMethodsMock),
	skip: jest.fn(() => QueryBuilderMethodsMock),
	take: jest.fn(() => QueryBuilderMethodsMock),
	limit: jest.fn(() => QueryBuilderMethodsMock),
	where: jest.fn(() => QueryBuilderMethodsMock),
	orWhere: jest.fn(() => QueryBuilderMethodsMock),
	andWhere: jest.fn(() => QueryBuilderMethodsMock),
	leftJoinAndSelect: jest.fn(() => QueryBuilderMethodsMock),
	select: jest.fn(() => QueryBuilderMethodsMock),
	getOne: jest.fn(),
	getMany: jest.fn(),
	getManyAndCount: jest.fn(),
}
