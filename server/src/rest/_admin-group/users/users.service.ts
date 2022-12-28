import { Inject, Injectable } from "@nestjs/common";
import { USERS_REPOSITORY, USERS_SERVICE } from "src/domain/users/consts";
import {
  IUsersRepository,
  IUsersService,
  UserDto,
} from "src/domain/users/typing";
import { IMailerService } from "src/libs/mailer/typing";
import { MAILER_SERVICE } from "src/libs/mailer/typing/consts";
import {
  IPagination,
  paginateAndGetMany,
  preapareItems,
  prepareSearchString,
} from "src/shared";
import { Brackets } from "typeorm";
import { StoreUserPayloadDto } from "./dtos";

@Injectable()
export class RestUsersService {
  @Inject(USERS_REPOSITORY)
  private readonly usersRepository: IUsersRepository;

  @Inject(USERS_SERVICE)
  private readonly usersService: IUsersService;

  @Inject(MAILER_SERVICE)
  private readonly mailerService: IMailerService;

  // public async store(dto: StoreUserPayloadDto) {
  // 	const user = await this.usersService.store({
  // 		username: dto.username,
  // 		email: dto.email,
  // 		fullName: dto.fullName,
  // 		password: dto.password,
  // 		role: dto.role,
  // 	})

  // 	await this.mailerService.send({
  // 		to: dto.email,
  // 		subject: 'Saltycoin',
  // 		text: `Hi, you have been registered in the Saltycoin admin panel\n\n Your username: ${dto.username} \n Your password: ${dto.password}`,
  // 	})

  // 	return user
  // }

  public async getList(pagination: IPagination) {
    const query = this.usersRepository.createQueryBuilder("it");

    if (pagination.searchString) {
      query.where(
        new Brackets((qb) => {
          qb.where("it.username ILIKE :searchString", {
            searchString: prepareSearchString(pagination.searchString),
          });
          qb.orWhere("it.email ILIKE :searchString");
          qb.orWhere("it.fullName ILIKE :fullName");
          qb.orWhere("it.id ILIKE :searchString");
        })
      );
    }

    const { items, count } = await paginateAndGetMany(query, pagination);

    return preapareItems(items, count, UserDto);
  }

  public async getOne(userId: number) {
    const user = await this.usersService.getOne({ where: { id: userId } });
    return user;
  }
}
