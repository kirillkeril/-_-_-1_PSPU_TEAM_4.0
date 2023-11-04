import { Module } from "@nestjs/common";
import { CheckerService } from "./checker.service";
import { CheckerController } from "./checker.controller";
import { HttpModule } from "@nestjs/axios";
import { StatusModule } from "../status/status.module";
import { DbModule } from "../db/db.module";

@Module({
  imports: [
    DbModule,
    StatusModule,
    HttpModule.register({
      headers: {
        "ngrok-ignore-": "1",
      },
    }),
  ],
  providers: [CheckerService],
  controllers: [CheckerController],
  exports: [CheckerService],
})
export class CheckerModule {}
