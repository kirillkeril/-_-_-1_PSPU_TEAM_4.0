import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/authDto";
import { RefreshDto } from "./dto/refreshDto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Post("/registration")
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto);
  }

  @Post("/refresh")
  async refresh(@Body() dto: RefreshDto) {
    const result = await this.authService.refresh(dto.refresh);
    // if (!result) throw new UnauthorizedException();
    return result;
  }
}
