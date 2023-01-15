import { Injectable } from "@nestjs/common";
import { Seeder } from "src/shared";
import { UsersService } from "../services/users.service";
import { UserRole } from "../typing";

@Injectable()
export class UsersSeed extends Seeder {
  protected name = "Admin user";

  constructor(private readonly usersService: UsersService) {
    super();
  }
  protected async seed(): Promise<void> {
    console.log("SEED START");

    await this.usersService.store({
      username: "Admin",
      usersurname: "Admin",
      email: "admin@admin.com",
      password: "123qqq",
      role: UserRole.Admin,
      phoneNumber:"+380984288233"
    });
  }
}
