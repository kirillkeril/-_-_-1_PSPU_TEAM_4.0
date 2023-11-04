import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDbDto } from "./dto/createDbDto";
import { UpdateDbDto } from "./dto/updateDbDto";
import { InjectModel } from "@nestjs/mongoose";
import { Db } from "./entities/db.entity";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import { RemoveDto } from "./dto/remove.dto";

@Injectable()
export class DbService {
  constructor(
    @InjectModel(Db.name) private readonly dbRepository: Model<Db>,
    private readonly usersService: UsersService,
  ) {}

  async create(createDbDto: CreateDbDto) {
    const user = await this.usersService.getById(createDbDto.userId);
    if (!user) throw new BadRequestException();

    const matches = createDbDto.connection.match(
      /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/,
    );
    const data = {
      dbUser: matches[2] != undefined ? matches[2].split(":")[0] : undefined,
      dbPassword:
        matches[2] != undefined ? matches[2].split(":")[1] : undefined,
      dbIp: matches[3],
      dbPort:
        matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[1] : undefined,
      dbName: matches[4] != undefined ? matches[4].split("/")[0] : undefined,
    };

    const db = await this.dbRepository.create({
      ...createDbDto,
      ...data,
      user,
    });
    db.actualStatus = null;
    await db.save();
    return db.populate("actualStatus");
  }

  async findAll() {
    return await this.dbRepository
      .find()
      .populate("statuses")
      .populate({
        path: "actualStatus",
        strictPopulate: false,
      })
      .exec();
  }

  async findAllByUser(userId: string) {
    const user = await this.usersService.getById(userId);
    if (!user) throw new BadRequestException();
    const res = await this.dbRepository
      .find({ user: user.id })
      .populate("actualStatus")
      .exec();
    if (!res) throw new NotFoundException();
    return res;
  }

  async findOne(id: string) {
    return await this.dbRepository.findById(id).exec();
  }

  async update(id: string, updateDbDto: UpdateDbDto) {
    const db = await this.dbRepository.findById(id).exec();
    if (!db) throw new NotFoundException();

    db.name = updateDbDto.name ?? db.name;
    db.dbUser = updateDbDto.name ?? db.dbUser;
    db.dbPassword = updateDbDto.name ?? db.dbPassword;
    db.dbIp = updateDbDto.name ?? db.dbIp;
    db.dbPort = updateDbDto.name ?? db.dbPort;
    db.dbName = updateDbDto.dbName ?? db.dbName;
    db.connection = `postgresql://${db.dbUser}:${db.dbPassword}@${db.dbIp}:${db.dbPort}/${db.dbName}`;
    return await db.save();
  }

  async remove(dto: RemoveDto) {
    const res = await this.dbRepository
      .findById(dto.connectionId)
      .populate("user")
      .exec();
    if (!res)
      throw new BadRequestException({
        message: `База данных с id ${dto.connectionId} не найдена`,
        status: "ERROR",
      });
    const user = await this.usersService.getById(dto.userId);
    console.log(res.user.telegramId == user.telegramId);
    if (res.user.telegramId !== user.telegramId) {
      return false;
    }
    return await res.deleteOne();
  }
}
