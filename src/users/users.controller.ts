import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUserDto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.schema";
import { UserViewModel } from "./models/viewModel/user.viewModel";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({})
  @ApiResponse({ status: "2XX", type: [User] })
  async getAll(
    @Query("count") count: number | undefined,
    @Query("skip") skip: number | undefined,
  ) {
    const users = await this.userService.getAll(count, skip);
    return users;
  }

  @Get(":id")
  @ApiOperation({})
  async getById(@Param() id: string) {
    const user = await this.userService.getById(id);
    return new UserViewModel("Все ок", "OK");
  }

  @Post()
  @ApiOperation({})
  @ApiResponse({ status: "2XX", type: User })
  async create(@Body() dto: CreateUserDto) {
    try {
      const user = await this.userService.create(dto);
      if (user)
        return new UserViewModel(`Спасибо за регистрацию! ${user.id}`, "OK");
      else return new UserViewModel(`Что-то пошло не так!`, "ERROR");
    } catch (e) {
      console.log(e);
      return new BadRequestException(
        new UserViewModel(`${e.response.message}`, "ERROR"),
      );
    }
  }
}
