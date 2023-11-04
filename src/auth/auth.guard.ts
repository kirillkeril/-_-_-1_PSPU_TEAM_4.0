import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    let result = false;
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) return false;

      const [type, token] = authHeader.split(" ");
      if (type !== "Bearer" || !token) return false;

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_PRIVATE_KEY,
      });
      request.user = user;
      result = !!user;
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException();
    }

    if (!result) throw new UnauthorizedException();
    return result;
  }
}
