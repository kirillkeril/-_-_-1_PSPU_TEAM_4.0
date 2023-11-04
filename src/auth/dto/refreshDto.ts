import { ApiProperty } from "@nestjs/swagger";

export class RefreshDto {
  constructor(refresh: string) {
    this.refresh = refresh;
  }

  @ApiProperty({ required: true })
  refresh: string;
}
