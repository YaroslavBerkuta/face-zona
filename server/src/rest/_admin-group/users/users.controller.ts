import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "src/domain/sessions/decorators";
import { UserDto, UserRole } from "src/domain/users/typing";
import { IPagination, ReqPagination } from "src/shared";
import { GetUsersListResponseDto, StoreUserPayloadDto } from "./dtos";
import { RestUsersService } from "./users.service";

@ApiTags("Admin | Users")
@Controller("admin/users")
export class RestUsersController {
  constructor(private readonly restUsersService: RestUsersService) {}

  // @ApiOperation({ summary: 'Store new user' })
  // @ApiOkResponse({
  // 	status: 201,
  // 	description: 'Return created user, send email to created user',
  // 	type: UserDto,
  // })
  // @RoleGuard(UserRole.Admin)
  // @Post()
  // public store(@Body() dto: StoreUserPayloadDto) {
  // 	return this.restUsersService.store(dto)
  // }

  @ApiOperation({ summary: "Get users list" })
  @ApiOkResponse({
    status: 201,
    description: "Return users list",
    type: GetUsersListResponseDto,
  })
  @RoleGuard(UserRole.Admin, UserRole.Manager)
  @Get()
  public getList(@ReqPagination() pagination: IPagination) {
    return this.restUsersService.getList(pagination);
  }

  @ApiOperation({ summary: "Get one user" })
  @ApiOkResponse({
    status: 200,
    description: "Return one user by id",
    type: UserDto,
  })
  @RoleGuard(UserRole.Admin, UserRole.Manager)
  @Get(":id")
  public getOne(@Param("id") userId: number) {
    return this.restUsersService.getOne(userId);
  }
}
