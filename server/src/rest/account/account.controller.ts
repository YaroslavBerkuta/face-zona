import { Body, Controller, Delete, Get, Patch } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ReqUser } from 'src/shared'
import { RestAccountService } from './account.service'
import { AccountDto } from './dtos'
import { ChangePasswordPayloadDto } from './dtos/change-password.dto'

@ApiTags('Account')
@Controller('account')
export class AccountController {
	constructor(private readonly accountService: RestAccountService) { }

	@ApiOperation({ summary: 'Get account' })
	@ApiOkResponse({
		status: 201,
		description: 'Return account',
		type: AccountDto,
	})
	@AuthGuard()
	@Get()
	public get(@ReqUser() userId: number) {
		return this.accountService.get(userId)
	}

	@ApiOperation({ summary: 'Change password' })
	@ApiOkResponse({ status: 200 })
	@AuthGuard()
	@Patch('/password')
	public changePassword(@ReqUser() userId: number, @Body() dto: ChangePasswordPayloadDto) {
		return this.accountService.changePassword(userId, dto)
	}

	@ApiOperation({ summary: 'Delete account' })
	@ApiOkResponse({
		status: 200,
		description: 'Account has been successfully deleted'
	})
	@AuthGuard()
	@Delete()
	public del(@ReqUser() userId: number) {
		return this.accountService.del(userId)
	}
}
