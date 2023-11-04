import { ApiProperty } from "@nestjs/swagger";

export class RemoveDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  connectionId: string;
}
