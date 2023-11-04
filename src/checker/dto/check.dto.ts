import { ApiProperty } from "@nestjs/swagger";

export class CheckDto {
  @ApiProperty({ required: false, example: "id" })
  dbId: string;
}
