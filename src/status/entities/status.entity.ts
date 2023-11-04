import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Db } from "../../db/entities/db.entity";
import mongoose from "mongoose";

@Schema()
export class Status {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Db" })
  db: Db;

  @Prop({ required: true })
  timeStamp: Date;

  @Prop({ required: true })
  state: string;

  @Prop({ required: false })
  metrics: [{ key: string; value: string }];
}

export const StatusSchema = SchemaFactory.createForClass(Status);
