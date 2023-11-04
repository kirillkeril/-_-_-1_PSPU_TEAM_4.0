import { BadRequestException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { StatusService } from "../status/status.service";
import { DbService } from "../db/db.service";

@Injectable()
export class CheckerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DbService,
    private readonly statusService: StatusService,
  ) {}

  async check(dbId: string) {
    const db = await this.dbService.findOne(dbId);
    if (!db)
      throw new BadRequestException({
        message: `База данных с id ${dbId} не найдена`,
        status: "ERROR",
      });

    const connectionString = db.connection;
    const result = await this.httpService.axiosRef.post(
      "http://localhost:8000/",
      {
        connection: `${connectionString}`,
      },
    );
    const metrics = { ...result.data };
    delete metrics["status"];
    const keys = Object.keys(metrics);
    const metricsValues = keys.map((k) => {
      return { key: k, value: metrics[k] };
    });
    const res = await this.statusService.create({
      state: result.data["status"],
      dbId: dbId,
      metrics: metricsValues,
    });
    console.log(res);
    return res;
  }
}
