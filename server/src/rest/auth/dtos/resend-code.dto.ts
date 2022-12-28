import { DtoProperty } from "src/shared";

export class ResendCodeDto {
    @DtoProperty()
    email: string
}