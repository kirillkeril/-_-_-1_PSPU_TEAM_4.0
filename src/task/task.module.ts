import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CheckerModule } from "../checker/checker.module";
import { TaskController } from "./task.controller";
import { UsersModule } from "../users/users.module";
import { DbModule } from "../db/db.module";

@Module({
  imports: [CheckerModule, UsersModule, DbModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
