import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../../status/entities/status.entity";

export interface DbData {
  id: string;
  name: string;
  ip: string;
  statuses?: Status[];
  actualStatus: Status;
}

export class DbViewModel {
  @ApiProperty({ required: true, example: "message" })
  message: string;
  @ApiProperty({ required: true, example: "OK" })
  status: string;
  @ApiProperty()
  db: DbData | undefined;

  constructor(message: string, status: string, db?: DbData) {
    this.message = message;
    this.status = status;
    this.db = db;
  }
}
