import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ required: true, example: "7982742u" })
  telegramId: string;

  constructor(telegramId: string) {
    this.telegramId = telegramId;
  }
}
