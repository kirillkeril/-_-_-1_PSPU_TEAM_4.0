import { ApiProperty } from "@nestjs/swagger";

export class UserViewModel {
  @ApiProperty({ required: true, example: "Спасибо за регистрацию!" })
  message: string;
  @ApiProperty({ example: "Успешно!" })
  status: string;

  constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }
}
