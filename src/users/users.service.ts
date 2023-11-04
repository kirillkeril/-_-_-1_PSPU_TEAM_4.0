import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./models/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUserDto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<User>) {}

  async create(dto: CreateUserDto) {
    const candidate = await this.getByTelegramId(dto.telegramId);
    if (candidate)
      throw new BadRequestException("Пользователь уже существует!");

    const user = new this.userRepository(dto);
    return await user.save();
  }

  async getAll(skip: number, count: number) {
    const users = await this.userRepository
      .find()
      .skip(skip)
      .limit(count)
      .exec();
    return users;
  }

  async getById(id: string) {
    return await this.userRepository.findOne({ telegramId: id }).exec();
  }

  async getByTelegramId(id: string) {
    return await this.userRepository
      .findOne({
        telegramId: id,
      })
      .exec();
  }
}
