import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SessionDto } from "src/domain/sessions/typing";
import { SignUpPayloadDto } from "./dtos/sign-up-payload.dto";
import { RestAuthService } from "./auth.service";
import { RefreshSessionPayloadDto,  SignInPayloadDto } from "./dtos";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: RestAuthService) {}

  @ApiOperation({ summary: "Sign up" })
  @ApiBody({ type: SignUpPayloadDto })
  @ApiOkResponse({
    status: 201,
    description: "Success sign up, create user and send confirm email code",
  })
  @Post("sign-up")
  public signUp(@Body() dto: SignUpPayloadDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: "Sign in" })
  @ApiBody({ type: SignInPayloadDto })
  @ApiOkResponse({
    status: 201,
    description: "Success sign in, return session object",
    type: SessionDto,
  })
  @Post("sign-in")
  public signIn(@Body() dto: SignInPayloadDto) {
    return this.authService.signIn(dto);
  }

  @ApiOperation({ summary: "Refresh session" })
  @ApiBody({ type: RefreshSessionPayloadDto })
  @ApiOkResponse({
    status: 201,
    description: "Success refresh, return session object",
    type: SessionDto,
  })
  @Post("refresh-session")
  public refreshSession(@Body() dto: RefreshSessionPayloadDto) {
    return this.authService.refreshSession(dto);
  }
}
