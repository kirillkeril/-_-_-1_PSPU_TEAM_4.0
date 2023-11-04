import { ApiProperty } from "@nestjs/swagger";

export class StartTaskDto {
  @ApiProperty({ required: true })
  userId: string;
}
