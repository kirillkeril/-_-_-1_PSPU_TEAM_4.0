import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { StatusService } from "./status.service";
import { CreateStatusDto } from "./dto/create-status.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Status")
@Controller("status")
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiOperation({})
  async create(@Body() createStatusDto: CreateStatusDto) {
    const res = await this.statusService.create(createStatusDto);
    if (!res)
      throw new NotFoundException({
        message: "Что-то пошло не так",
        status: "ERROR",
      });
    return { message: "Статус обновлен", status: "OK" };
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.statusService.findOne(id);
  }

  @Get("/for-db/:id")
  findForDb(@Param("id") id: string) {
    return this.statusService.findForDb(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateStatusDto: UpdateStatusDto) {
  //   return this.statusService.update(+id, updateStatusDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.statusService.remove(id);
  }
}
