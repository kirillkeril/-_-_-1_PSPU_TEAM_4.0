import { ApiProperty } from "@nestjs/swagger";

export class CreateStatusDto {
  @ApiProperty({ required: true, example: "string" })
  dbId: string;

  @ApiProperty({ required: true, example: "SUCCESS" })
  state: string;

  @ApiProperty({ required: false, example: [{ key: "some", value: "some" }] })
  metrics: { key: string; value: string }[];
}
