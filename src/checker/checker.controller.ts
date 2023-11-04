import { Body, Controller, Post } from "@nestjs/common";
import { CheckerService } from "./checker.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CheckDto } from "./dto/check.dto";

@ApiTags("checker")
@Controller("checker")
export class CheckerController {
  constructor(private readonly checkerService: CheckerService) {}

  @ApiOperation({})
  @Post()
  async check(@Body() dto: CheckDto) {
    const res = await this.checkerService.check(dto.dbId);
    return res;
  }
}
