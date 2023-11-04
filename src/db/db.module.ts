import { Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { DbController } from "./db.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Db, DbSchema } from "./entities/db.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Db.name, schema: DbSchema }]),
    UsersModule,
  ],
  controllers: [DbController],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
