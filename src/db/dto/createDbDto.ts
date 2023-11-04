import { ApiProperty } from "@nestjs/swagger";

export class CreateDbDto {
  @ApiProperty({ required: true, example: "name" })
  name: string;

  @ApiProperty({ required: true })
  connection: string;

  @ApiProperty({ required: true, example: "324374327498" })
  userId: string;
}
