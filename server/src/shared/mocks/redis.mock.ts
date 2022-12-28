import { jest } from '@jest/globals'
const mockRedisStore = (): { [key: string]: string } => ({})

export const mockRedisService = () => {
	const store = mockRedisStore()
	return {
		get: jest.fn((key: string) => store[key]),
		set: jest.fn((key: string, value: string) => {
			store[key] = value
		}),
		del: jest.fn((key: string) => delete store[key]),
	}
}
