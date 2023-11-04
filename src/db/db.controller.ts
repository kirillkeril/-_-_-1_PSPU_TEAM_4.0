import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DbService } from "./db.service";
import { CreateDbDto } from "./dto/createDbDto";
import { UpdateDbDto } from "./dto/updateDbDto";
import { ApiTags } from "@nestjs/swagger";
import { DbData, DbViewModel } from "./dto/dbViewModel";
import { GetUsersDbDto } from "./dto/getUsersDbDto";
import { RemoveDto } from "./dto/remove.dto";

@Controller("db")
@ApiTags("db")
export class DbController {
  constructor(private readonly dbService: DbService) {}

  @Post()
  async create(@Body() createDbDto: CreateDbDto) {
    try {
      const result = await this.dbService.create(createDbDto);
      return new DbViewModel("Успешно добавлена новая база данных", "OK", {
        id: result.id,
        name: result.name,
        ip: result.dbIp,
        statuses: result.statuses,
      });
    } catch (e) {
      throw new BadRequestException(new DbViewModel(e, "ERROR"));
    }
  }

  @Post("get-by-user")
  async findAllByUser(@Body() getUsersDb: GetUsersDbDto): Promise<DbData[]> {
    const res = await this.dbService.findAllByUser(getUsersDb.userId);
    if (!res) throw new NotFoundException();
    return res.map((d) => {
      return {
        id: d.id,
        name: d.name,
        ip: d.dbIp,
        statuses: d.statuses,
      };
    });
  }

  @Get()
  async findAll(): Promise<DbData[]> {
    const res = await this.dbService.findAll();
    if (!res) throw new NotFoundException();
    return res.map((d) => {
      return {
        id: d.id,
        name: d.name,
        ip: d.dbIp,
        statuses: d.statuses,
      };
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<DbData> {
    const res = await this.dbService.findOne(id);
    if (!res) throw new NotFoundException();
    return {
      id: res.id,
      name: res.name,
      ip: res.dbIp,
      statuses: res.statuses,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDbDto: UpdateDbDto) {
    const res = await this.dbService.update(id, updateDbDto);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Delete()
  async remove(@Body() removeDto: RemoveDto) {
    const deleted = await this.dbService.remove(removeDto);
    if (deleted)
      return { message: `Успешно удалено! ${deleted.name}`, status: "OK" };
    return { message: "Что-то пошло не так", status: "ERROR" };
  }
}
