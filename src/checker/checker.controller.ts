import { Controller } from "@nestjs/common";
import { CheckerService } from "./checker.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("checker")
@Controller("checker")
export class CheckerController {
  constructor(private readonly checkerService: CheckerService) {}

  // @ApiOperation({})
  // @Post()
  // async check(@Body() dto: CheckDto) {
  //   const res = await this.checkerService.check(dto.dbId);
  //   return res;
  // }
}
