import { ApiProperty } from "@nestjs/swagger";

export class CheckDto {
  @ApiProperty({ required: false, example: "id" })
  dbId: string;

  @ApiProperty({ required: false, example: "id" })
  userId: string;
}
