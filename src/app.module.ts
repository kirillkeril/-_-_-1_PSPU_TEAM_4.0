import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./db/db.module";
import { StatusModule } from "./status/status.module";
import { CheckerModule } from "./checker/checker.module";
import * as process from "process";
import { ScheduleModule } from "@nestjs/schedule";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION, {
      dbName: `${process.env.DB_NAME}`,
      directConnection: true,
    }),

    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    DbModule,
    StatusModule,
    CheckerModule,
    TaskModule,
  ],
})
export class AppModule {}
