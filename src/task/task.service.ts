import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CheckerService } from "../checker/checker.service";
import { UsersService } from "../users/users.service";
import { DbService } from "../db/db.service";

@Injectable()
export class TaskService {
  constructor(
    private readonly checkerService: CheckerService,
    private readonly usersService: UsersService,
    private readonly dbService: DbService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    utcOffset: 5,
  })
  async startCheck() {
    const users = await this.usersService.getAll(0, 0);
    try {
      users.map(async (u) => {
        const c = await this.dbService.findAllByUser(u.telegramId);
        c.map((conn) => {
          this.checkerService.check(conn._id.toString(), u.telegramId);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
