import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.schema";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
