import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @ApiProperty({ required: true, example: "email@mail.com" })
  email: string;

  @ApiProperty({ required: true, example: "password" })
  password: string;
}
