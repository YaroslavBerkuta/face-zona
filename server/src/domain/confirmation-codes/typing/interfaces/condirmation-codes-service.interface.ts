export interface ISendConfirmationCodePayload {
    receiver: string
    senderCallback(code: string): Promise<void> | void
}

export interface IConfirmationCodesService {
    sendConfirmationCode(payload: ISendConfirmationCodePayload): Promise<void>
    confirmCode(receiver: string, code: string): Promise<boolean>
    compareCodes(receiver: string, code: string): Promise<boolean>
}