import { Connection } from 'typeorm'

export const provideEntity = (name, entity) => {
	return {
		provide: name,
		useFactory: (connection: Connection) => connection.getRepository(entity),
		inject: [Connection],
	}
}

export const provideCustomRepository = (name, repo) => {
	return {
		provide: name,
		useFactory: (connection: Connection) => connection.getCustomRepository(repo),
		inject: [Connection],
	}
}
