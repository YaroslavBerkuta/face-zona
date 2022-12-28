import { DtoProperty } from "src/shared";

export class SignInPayloadDto {
  @DtoProperty()
  email: string;

  @DtoProperty()
  password: string;
}
