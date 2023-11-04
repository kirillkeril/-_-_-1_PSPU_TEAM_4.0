import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthDto } from "./dto/authDto";
import { UserDocument } from "../users/models/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    // const userModel = new User();
    // userModel.email = dto.email;
    // userModel.password = await hash(dto.password, 1);
    //
    // const user = await this.userService.create(userModel);
    //
    // return this.createTokenPair(user);
  }

  async login(dto: AuthDto) {
    // const candidate = await this.userService.getByEmail(dto.email);
    // if (!candidate) throw new BadRequestException("Wrong email or password");
    // const isCompare = await compare(dto.password, candidate.password);
    // if (!isCompare) throw new BadRequestException("Wrong email or password");
    //
    // return this.createTokenPair(candidate);
  }

  async refresh(refresh: string) {
    // try {
    //   const userData = await this.jwtService.verifyAsync(refresh, {
    //     ignoreExpiration: true,
    //   });
    //   console.log(refresh);
    //   const user = await this.userService.getById(userData.id);
    //   console.log(user.refresh);
    //   if (refresh !== user.refresh) return false;
    //   return this.createTokenPair(user);
    // } catch (e) {
    //   console.log(e);
    //   throw new UnauthorizedException();
    // }
  }

  private async createTokenPair(user: UserDocument) {
    // const payload = {
    //   id: user._id,
    //   roles: user.roles.map((r) => r.value),
    //   time: Date.now(),
    // };
    //
    // const access = await this.jwtService.signAsync({ ...payload });
    // const refresh = await this.jwtService.signAsync(
    //   { id: user._id },
    //   { expiresIn: "10m" },
    // );
    //
    // const patchDto = new PatchDto();
    // patchDto.refresh = refresh;
    //
    // await this.userService.patch(user._id.toString(), patchDto);
    // return { access, refresh };
  }
}
