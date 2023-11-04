import { ApiProperty } from "@nestjs/swagger";

export class GetUsersDbDto {
  @ApiProperty({ required: true, example: "489347328" })
  userId: string;
}
