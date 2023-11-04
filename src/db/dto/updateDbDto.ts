import { ApiProperty } from "@nestjs/swagger";

export class UpdateDbDto {
  @ApiProperty({ required: false, example: "name" })
  name?: string;

  @ApiProperty({ required: false })
  dbName?: string;

  @ApiProperty({ required: false })
  dbIp?: string;

  @ApiProperty({ required: false })
  dbUser?: string;

  @ApiProperty({ required: false })
  dbPassword?: string;

  @ApiProperty({ required: false })
  dbPort?: string;
}
