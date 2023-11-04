import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: "5s",
        issuer: process.env.JWT_ISSUER,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
