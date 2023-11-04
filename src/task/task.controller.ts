import { Controller, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("task")
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({})
  async startTask() {
    await this.taskService.startCheck();
  }
}
