import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Status } from "./entities/status.entity";
import { Model } from "mongoose";
import { DbService } from "../db/db.service";

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private readonly statusRepository: Model<Status>,
    private readonly dbService: DbService,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    const db = await this.dbService.findOne(createStatusDto.dbId);
    if (!db) throw new NotFoundException();
    const status = await this.statusRepository.create({
      db,
      state: createStatusDto.state,
      metrics: [...createStatusDto.metrics],
      timeStamp: Date.now(),
    });
    db.statuses.push(status);
    db.$set("actualStatus", status);
    await db.save();
    await status.save();
    return status;
  }

  findAll() {
    return this.statusRepository.find().exec();
  }

  findOne(id: string) {
    return this.statusRepository.findById(id).exec();
  }

  findForDb(dbId: string) {
    return this.statusRepository
      .find()
      .populate("statuses")
      .populate({
        path: "db",
        match: { _id: dbId },
      })
      .exec();
  }

  remove(id: string) {
    return this.statusRepository.findByIdAndRemove(id).exec();
  }
}
