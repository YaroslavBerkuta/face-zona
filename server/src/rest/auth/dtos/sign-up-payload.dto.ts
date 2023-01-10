import { IsEmail } from "class-validator";
import { DtoProperty } from "src/shared";

export class SignUpPayloadDto {
  @DtoProperty()
  username: string;

  @DtoProperty()
  usersurname: string;

  @DtoProperty()
  @IsEmail()
  email: string;

  @DtoProperty()
  password: string;
}
