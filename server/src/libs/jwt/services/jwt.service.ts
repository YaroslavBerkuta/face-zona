import { Inject, Injectable } from '@nestjs/common'
import { JWT_KEY, JWT_PAYLOAD_KEY } from '../consts'
import * as aes256 from 'aes256'
import * as jwt from 'jsonwebtoken'
import { ICreateTokenPayload } from '../interfaces'

@Injectable()
export class JwtService {
	@Inject(JWT_KEY)
	private jwtKey: string

	@Inject(JWT_PAYLOAD_KEY)
	private jwtPayloadKey: string

	public createToken({ id, expiresIn = '360s', role, sessionId }: ICreateTokenPayload): string {
		const payload = {
			sub: aes256.encrypt(
				this.jwtPayloadKey,
				JSON.stringify({
					id,
					role,
					sessionId,
				}),
			),
		}
		return jwt.sign(payload, this.jwtKey, expiresIn ? { expiresIn } : {})
	}
	public decodeToken(token: string) {
		try {
			const result = jwt.verify(token, this.jwtKey)
			if (!result) return null

			const decrypted = JSON.parse(aes256.decrypt(this.jwtPayloadKey, result.sub))

			return {
				id: decrypted.id,
				role: decrypted.role,
				sessionId: decrypted.sessionId,
			}
		} catch (e) {
			return null
		}
	}
}
