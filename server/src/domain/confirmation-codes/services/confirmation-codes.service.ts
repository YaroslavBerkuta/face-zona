import { Inject, Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring'
import { REDIS_SERVICE } from 'src/libs/redis/consts';
import { IRedisService } from 'src/libs/redis/interfaces';
import { IConfirmationCodesService, ISendConfirmationCodePayload } from "../typing";

@Injectable()
export class ConfirmationCodesService implements IConfirmationCodesService {
    @Inject(REDIS_SERVICE)
    private readonly redisService: IRedisService

    public async sendConfirmationCode(payload: ISendConfirmationCodePayload): Promise<void> {
        const code = this.generateCode()
        await payload.senderCallback(code)
        this.saveCode(payload.receiver, code)
    }

    public async confirmCode(receiver: string, code: string): Promise<boolean> {
        const isCorrect = await this.compareCodes(receiver, code)

        if (isCorrect) {
            await this.deleteCode(receiver)
        }

        return isCorrect
    }

    public async compareCodes(receiver: string, code: string): Promise<boolean> {
        const savedCode = await this.getCode(receiver)
        return code === savedCode
    }

    private generateCode(length: number = 4): string {
        return randomstring.generate({ length, charset: 'numeric' })
    }

    private async getCode(receiver: string): Promise<string> {
        return await this.redisService.get(this.addPrefix(receiver))
    }

    private async saveCode(receiver: string, code: string): Promise<void> {
        await this.redisService.set(this.addPrefix(receiver), code)
    }

    private async deleteCode(receiver: string): Promise<void> {
        await this.redisService.del(this.addPrefix(receiver))
    }

    private addPrefix(receiver: string): string {
        return 'receiver-' + receiver
    }
}