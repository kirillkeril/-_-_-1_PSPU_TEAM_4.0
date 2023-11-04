import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Status } from "../../status/entities/status.entity";
import { User } from "../../users/models/user.schema";

@Schema()
export class Db {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  user: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dbName: string;

  @Prop({ required: true })
  dbIp: string;

  @Prop({ required: true })
  dbUser: string;

  @Prop({ required: true })
  dbPassword: string;

  @Prop({ required: true })
  dbPort: string;

  @Prop({ required: true })
  connection: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: Status.name,
  })
  actualStatus: Status;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Status" }],
  })
  statuses: [Status];
}

export const DbSchema = SchemaFactory.createForClass(Db);
