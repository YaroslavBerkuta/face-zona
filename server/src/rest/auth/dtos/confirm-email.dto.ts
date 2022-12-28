import { DtoProperty } from "src/shared";

export class ConfirmEmailDto {
    @DtoProperty()
    email: string

    @DtoProperty()
    code: string

    @DtoProperty()
    deviceName: string
}