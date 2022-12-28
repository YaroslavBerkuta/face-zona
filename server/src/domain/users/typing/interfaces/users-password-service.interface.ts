export interface IUsersPasswordService {
	hashPassword(password: string, salt: string): Promise<string>
	createSalt(): string
	comparePassword(userId: number, password: string): Promise<boolean>
	changeUserPassword(userId: number, newPassword: string): Promise<void>
}
